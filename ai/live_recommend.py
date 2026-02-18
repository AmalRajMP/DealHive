import pandas as pd
import joblib
import os
import shap
import numpy as np
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
from product_similarity import get_similar_products
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
# MongoDB connection (Atlas)
# ----------------------------
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env file")

client = MongoClient(MONGO_URI)
db = client["dealhive_db"]

interactions_col = db["useractivities"]
products_col = db["products"]

# ----------------------------
# Action scoring (normalized)
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
# Recursive ObjectId Converter
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
# Build feature vector from Mongo logs
# ----------------------------
def build_user_features(user_id):

    print("User ID received:", user_id)

    try:
        user_object_id = ObjectId(user_id)
    except Exception:
        return None, None

    logs = list(interactions_col.find({"user": user_object_id}))

    print("Logs found:", logs)

    if not logs:
        return None, None

    df = pd.DataFrame(logs)

    df["action"] = df["action"].astype(str).str.lower().str.strip()
    df["score"] = df["action"].map(action_score_map).fillna(0)

    total_interactions = len(df)
    purchase_count = (df["score"] >= 5).sum()

    product_ids = []

    for log in logs:
        print("Log document:", log)

        if "meta" in log and isinstance(log["meta"], dict):
            pid = log["meta"].get("productId")

            if pid is None:
                continue

            product_ids.append(str(pid))

    print("Extracted product_ids:", product_ids)

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
# Live Recommendation
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
        reasons.append(
            "Matches your preference for budget-friendly items"
        )
    elif price and price > 2000:
        reasons.append(
            "Fits your interest in premium products"
        )

    if explanation["similarity"] > 0.4:
        reasons.append(
            "Similar to items you recently viewed or added to cart"
        )

    if explanation["location"] > 0.2:
        reasons.append(
            "Service support is available near your location"
        )

    if not reasons:
        reasons.append(
            "Recommended based on your activity and preferences"
        )

    return reasons[:2]  # ← only top 2 reasons

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
    # Recommendation Logic
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

    last_product = product_ids[-1]

    try:
        recommended = get_similar_products(last_product)

        if not recommended:
            recommended = get_fallback_products()

    except Exception:
        recommended = get_fallback_products()

    recommended = convert_objectids(recommended)

    # ----------------------------
    # SHAP EXPLANATION
    # ----------------------------

    background = np.array([
        [0,0,0],
        [0.5,0.2,0.1],
        [1,1,1]
    ])

    explainer = shap.Explainer(model_predict, background)

    # Real interaction score
    interaction_score = len(product_ids) / 10
    interaction_score = min(interaction_score, 1)

    # SHAP input = [similarity, interaction, location]
    similarity_score = 1.0   # temporary placeholder for similarity result

    sample = np.array([[similarity_score, interaction_score, 0.5]])

    shap_values = explainer(sample)

    explanation = {
        "similarity": float(shap_values.values[0][0]),
        "interaction": float(shap_values.values[0][1]),
        "location": float(shap_values.values[0][2])
    }

    # ----------------------------
    # FINAL RESPONSE
    # ----------------------------
    for product in recommended:
        product["why"] = generate_reason_text(explanation, product)

    return {
        "user": user_id,
        "interest_score": float(prob),
        "recommended_products": recommended,
        "explanation": explanation
    }

