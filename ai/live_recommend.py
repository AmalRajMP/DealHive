import pandas as pd
import joblib
import os
import shap
import numpy as np
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
from product_similarity import get_similar_products
from collaborative_filter import get_collaborative_recommendations
from xai_model import model_predict

# ----------------------------
# Load environment variables
# ----------------------------
load_dotenv("../backend/.env")

# ----------------------------
# Load trained model
# ----------------------------
model = joblib.load("models/recommender_model.pkl")

# ----------------------------
# SHAP BACKGROUND + EXPLAINER
# ----------------------------
background = np.array([
    [0, 0, 0],
    [0.5, 0.2, 0.1],
    [1, 1, 1]
])

explainer = shap.Explainer(model_predict, background)

# ----------------------------
# MongoDB connection
# ----------------------------
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env file")

client = MongoClient(MONGO_URI)
db = client["dealhive_db"]

interactions_col = db["useractivities"]
products_col = db["products"]

# ----------------------------
# Action scoring
# ----------------------------
action_score_map = {
    "view": 1,
    "search": 2,
    "wishlist": 3,
    "added to wishlist": 3,
    "add to cart": 4,
    "added to cart": 4,
    "purchase": 5,
    "purchased": 5,
    "placed order": 5
}

# ----------------------------
# Convert ObjectId → string
# ----------------------------
def convert_objectids(obj):
    if isinstance(obj, list):
        return [convert_objectids(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: convert_objectids(value) for key, value in obj.items()}
    elif isinstance(obj, ObjectId):
        return str(obj)
    else:
        return obj


# ----------------------------
# Build user feature vector
# ----------------------------
def build_user_features(user_id):

    try:
        user_object_id = ObjectId(user_id)
    except Exception:
        return None, None, None

    logs = list(interactions_col.find({"user": user_object_id}).limit(50))

    # 🔹 no interactions → cold start
    if not logs:
        return None, [], {
            "fav_category": None,
            "avg_price": None,
            "interaction_count": 0
        }

    df = pd.DataFrame(logs)

    df["action"] = df["action"].astype(str).str.lower().str.strip()
    df["score"] = df["action"].map(action_score_map).fillna(0)

    total_interactions = len(df)
    purchase_count = (df["score"] >= 5).sum()

    product_ids = []
    categories = []
    prices = []

    for log in logs:
        if "meta" in log and isinstance(log["meta"], dict):

            pid = log["meta"].get("productId")
            if pid:
                product_ids.append(str(pid))

            cat = log["meta"].get("category")
            if cat:
                categories.append(cat)

            price = log["meta"].get("price")
            if price:
                prices.append(price)

    features = {
        "user_total_interactions": total_interactions,
        "user_purchase_ratio":
            purchase_count / total_interactions if total_interactions > 0 else 0
    }

    profile = {
        "fav_category": max(set(categories), key=categories.count) if categories else None,
        "avg_price": np.mean(prices) if prices else None,
        "interaction_count": total_interactions
    }

    return pd.DataFrame([features]), product_ids, profile


# ----------------------------
# Fallback products
# ----------------------------
def get_fallback_products(limit=12):
    products = list(
        products_col.find().sort("rating", -1).limit(limit)
    )
    return convert_objectids(products)


# ----------------------------
# EXPLANATION ENGINE
# ----------------------------
def generate_reason(product, explanation, profile):

    similarity = explanation["similarity"]
    interaction = explanation["interaction"]
    location = explanation["location"]

    category = product.get("category")
    price = product.get("discountPrice")
    source = product.get("source")

    strongest = max(
        {"similarity": similarity, "interaction": interaction, "location": location},
        key=lambda k: {"similarity": similarity, "interaction": interaction, "location": location}[k]
    )

    if source == "collaborative":
        if category:
            return f"Users who explored {category} also chose this"
        return "Users with similar activity chose this"

    if strongest == "interaction":

        if profile["fav_category"] and category == profile["fav_category"]:
            return f"Because you often browse {category}"

        if profile["avg_price"] and price and price <= profile["avg_price"]:
            return "Because it matches your usual price range"

        if category:
            return f"Because you viewed {category} products"

        return "Because you interacted with similar items"

    if strongest == "similarity":

        if category:
            return f"Similar to {category} items you explored"

        return "Similar to items you viewed"

    if strongest == "location":
        return "Service available near your location"

    return "Trending among shoppers"


# ----------------------------
# MAIN RECOMMENDER FUNCTION
# ----------------------------
def recommend_live(user_id):

    user_features, product_ids, profile = build_user_features(user_id)

    # ---------------- COLD START USERS ----------------
    if not product_ids:

        trending = get_fallback_products()

        for p in trending:
            p["why"] = "Popular among shoppers right now"

        return {
            "user": user_id,
            "userType": "new",
            "interest_score": 0,

            "recommendations": {
                "contentBased": [],
                "collaborative": [],
                "trending": trending,
                "hybrid": trending
            },

            "explanation": {
                "similarity": 0,
                "interaction": 0,
                "location": 1
            }
        }

    # ---------------- MODEL PREDICTION ----------------
    user_features = user_features.reindex(
        columns=model.feature_names_in_,
        fill_value=0
    )

    prob = model.predict_proba(user_features)[0][1]

    # ---------------- CONTENT BASED ----------------
    last_product = product_ids[-1]

    try:
        recommended = get_similar_products(last_product)
        if not recommended:
            recommended = get_fallback_products()
    except Exception:
        recommended = get_fallback_products()

    recommended = convert_objectids(recommended)

    for p in recommended:
        p["source"] = "content"

    # ---------------- COLLABORATIVE ----------------
    collab_ids = get_collaborative_recommendations(user_id)

    if collab_ids:

        collab_products = list(
            products_col.find({
                "_id": {"$in": [ObjectId(i) for i in collab_ids]}
            })
        )

        for p in collab_products:
            p["similarity_score"] = 0.3
            p["source"] = "collaborative"

        recommended.extend(collab_products)

    # ---------------- RANKING ----------------
    scored_products = []
    interaction_score = min(len(product_ids) / 10, 1)

    for product in recommended:

        raw_sim = product.get("similarity_score", 0)
        similarity_score = (raw_sim + 1) / 2
        model_score = float(prob)

        final_score = (
            similarity_score * 0.85 +
            model_score * 0.15
        )

        confidence = round((similarity_score + interaction_score) / 2, 3)

        product["final_score"] = final_score
        product["confidence"] = confidence

        scored_products.append(product)

    recommended = sorted(
        scored_products,
        key=lambda x: x["final_score"],
        reverse=True
    )[:12]

    recommended = convert_objectids(recommended)

    # ---------------- SHAP EXPLANATION ----------------
    avg_similarity = np.mean([
        p.get("similarity_score", 0) for p in recommended
    ])

    sample = np.array([[avg_similarity, interaction_score, 0.5]])
    shap_values = explainer(sample)

    explanation = {
        "similarity": float(shap_values.values[0][0]),
        "interaction": float(shap_values.values[0][1]),
        "location": float(shap_values.values[0][2])
    }

    for product in recommended:
        product["why"] = generate_reason(product, explanation, profile)

    content_based = [p for p in recommended if p.get("source") == "content"]
    collaborative = [p for p in recommended if p.get("source") == "collaborative"]
    trending = get_fallback_products()

    return {
        "user": user_id,
        "userType": "existing",
        "interest_score": float(prob),

        "recommendations": {
            "contentBased": content_based,
            "collaborative": collaborative,
            "trending": trending,
            "hybrid": recommended
        },

        "explanation": explanation
    }