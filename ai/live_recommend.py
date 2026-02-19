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
        return None, None

    logs = list(interactions_col.find({"user": user_object_id}).limit(50))

    if not logs:
        return None, None

    df = pd.DataFrame(logs)

    df["action"] = df["action"].astype(str).str.lower().str.strip()
    df["score"] = df["action"].map(action_score_map).fillna(0)

    total_interactions = len(df)
    purchase_count = (df["score"] >= 5).sum()

    product_ids = []

    for log in logs:
        if "meta" in log and isinstance(log["meta"], dict):
            pid = log["meta"].get("productId")
            if pid:
                product_ids.append(str(pid))

    features = {
        "user_total_interactions": total_interactions,
        "user_purchase_ratio":
            purchase_count / total_interactions if total_interactions > 0 else 0
    }

    return pd.DataFrame([features]), product_ids


# ----------------------------
# Fallback products
# ----------------------------
def get_fallback_products(limit=5):
    products = list(products_col.find().limit(limit))
    return convert_objectids(products)


# ----------------------------
# Generate explanation text
# ----------------------------
def generate_reason_text(explanation, product):

    reasons = []

    category = product.get("category", "")
    price = product.get("discountPrice", 0)
    title = product.get("title", "this product")

    if explanation["interaction"] > 0.5:
        reasons.append(
            f"You showed strong interest in products similar to {title}"
        )

    if category:
        reasons.append(
            f"You often explore {category} products"
        )

    if price and price < 1000:
        reasons.append("Matches your preference for budget-friendly items")

    elif price and price > 2000:
        reasons.append("Fits your interest in premium products")

    if explanation["similarity"] > 0.4:
        reasons.append("Similar to items you recently viewed or added to cart")

    if explanation["location"] > 0.2:
        reasons.append("Service support is available near your location")

    if not reasons:
        reasons.append("Recommended based on your activity and preferences")

    return reasons[:2]


# ----------------------------
# MAIN RECOMMENDER FUNCTION
# ----------------------------
def recommend_live(user_id):

    user_features, product_ids = build_user_features(user_id)

    if user_features is None:
        return {"error": "No interactions for user"}

    user_features = user_features.reindex(
        columns=model.feature_names_in_,
        fill_value=0
    )

    prob = model.predict_proba(user_features)[0][1]

    # ----------------------------
    # Cold start
    # ----------------------------
    if not product_ids:

        explanation = {
            "similarity": 0.0,
            "interaction": 0.0,
            "location": 0.0,
            "note": "Fallback recommendations (no product history)"
        }

        return {
            "user": user_id,
            "interest_score": float(prob),
            "recommended_products": get_fallback_products(),
            "explanation": explanation
        }

    # ----------------------------
    # Content-based recommendations
    # ----------------------------
    last_product = product_ids[-1]

    try:
        recommended = get_similar_products(last_product)
        if not recommended:
            recommended = get_fallback_products()

    except Exception:
        recommended = get_fallback_products()

    recommended = convert_objectids(recommended)

    # ----------------------------
    # Collaborative recommendations
    # ----------------------------
    collab_ids = get_collaborative_recommendations(user_id)

    if collab_ids:

        collab_products = list(
            products_col.find({
                "_id": {"$in": [ObjectId(i) for i in collab_ids]}
            })
        )

        for p in collab_products:
            p["similarity_score"] = 0.3

        recommended.extend(collab_products)

    # ----------------------------
    # Hybrid ranking
    # ----------------------------
    scored_products = []

    for product in recommended:

        raw_sim = product.get("similarity_score", 0)
        similarity_score = (raw_sim + 1) / 2
        model_score = float(prob)

        final_score = (
            similarity_score * 0.85 +
            model_score * 0.15
        )

        product["final_score"] = final_score
        scored_products.append(product)

    # SORT AFTER LOOP
    recommended = sorted(
        scored_products,
        key=lambda x: x["final_score"],
        reverse=True
    )

    # CONVERT AFTER SORT
    recommended = convert_objectids(recommended)

    # ----------------------------
    # SHAP explanation
    # ----------------------------
    interaction_score = min(len(product_ids) / 10, 1)

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

    # ----------------------------
    # Attach reasons
    # ----------------------------
    for product in recommended:
        product["why"] = generate_reason_text(explanation, product)

    # ----------------------------
    # Final response
    # ----------------------------
    return {
        "user": user_id,
        "interest_score": float(prob),
        "recommended_products": recommended,
        "explanation": explanation
    }
