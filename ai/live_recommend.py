import pandas as pd
import joblib
import os
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
from product_similarity import get_similar_products

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

    try:
        user_object_id = ObjectId(user_id)
    except Exception:
        return None, None

    logs = list(interactions_col.find({"user": user_object_id}))

    if not logs:
        return None, None

    df = pd.DataFrame(logs)

    # normalize action text safely
    df["action"] = df["action"].astype(str).str.lower().str.strip()
    df["score"] = df["action"].map(action_score_map).fillna(0)

    total_interactions = len(df)
    purchase_count = (df["score"] >= 5).sum()

    # Extract product IDs safely
    product_ids = []

    for log in logs:
        if "meta" in log and isinstance(log["meta"], dict):
            pid = log["meta"].get("productId")

            if pid is None:
                continue

            try:
                product_ids.append(int(pid))
            except:
                continue

    features = {
        "user_total_interactions": total_interactions,
        "user_purchase_ratio":
            purchase_count / total_interactions if total_interactions > 0 else 0
    }

    return pd.DataFrame([features]), product_ids


# ----------------------------
# Fallback products (if similarity fails)
# ----------------------------
def get_fallback_products(limit=5):
    products = list(products_col.find().limit(limit))
    return convert_objectids(products)


# ----------------------------
# Live Recommendation
# ----------------------------
def recommend_live(user_id):

    user_features, product_ids = build_user_features(user_id)

    if user_features is None:
        return {"error": "No interactions for user"}

    # Match training schema
    user_features = user_features.reindex(
        columns=model.feature_names_in_,
        fill_value=0
    )

    prob = model.predict_proba(user_features)[0][1]

    # ----------------------------
    # Recommendation Logic
    # ----------------------------

    if not product_ids:
        return {
            "user": user_id,
            "interest_score": float(prob),
            "recommended_products": get_fallback_products()
        }

    last_product = product_ids[-1]

    try:
        recommended = get_similar_products(last_product)

        if not recommended:
            recommended = get_fallback_products()

    except Exception:
        recommended = get_fallback_products()

    # Convert all ObjectIds recursively
    recommended = convert_objectids(recommended)

    return {
        "user": user_id,
        "interest_score": float(prob),
        "recommended_products": recommended
    }
