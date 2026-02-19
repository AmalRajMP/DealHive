import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# ----------------------------
# LOAD ENV
# ----------------------------
load_dotenv("../backend/.env")

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env")

client = MongoClient(MONGO_URI)
db = client["dealhive_db"]
products_col = db["products"]

# =====================================================
# GLOBAL CACHE (avoids recomputing every API call)
# =====================================================
DF_CACHE = None
SIM_MATRIX = None


# =====================================================
# BUILD SIMILARITY ENGINE
# =====================================================
def build_similarity_engine():
    global DF_CACHE, SIM_MATRIX

    products = list(products_col.find())

    if not products:
        raise ValueError("No products found in database")

    df = pd.DataFrame(products)

    # ---------- numeric features ----------
    features = df[[
        "rating",
        "originalPrice",
        "discountPrice",
        "discountPercent"
    ]].fillna(0)

    # ---------- categorical encoding ----------
    features = pd.concat([
        features,
        pd.get_dummies(df["category"], prefix="cat"),
        pd.get_dummies(df["brand"], prefix="brand")
    ], axis=1)

    # ---------- scaling ----------
    scaler = StandardScaler()
    scaled = scaler.fit_transform(features)

    # ---------- similarity ----------
    similarity_matrix = cosine_similarity(scaled)

    DF_CACHE = df
    SIM_MATRIX = similarity_matrix


# =====================================================
# INITIAL LOAD
# =====================================================
build_similarity_engine()


# =====================================================
# MAIN FUNCTION
# =====================================================
def get_similar_products(product_id, top_n=5):

    global DF_CACHE, SIM_MATRIX

    # safety reload if cache empty
    if DF_CACHE is None or SIM_MATRIX is None:
        build_similarity_engine()

    df = DF_CACHE
    similarity_matrix = SIM_MATRIX

    # ---------- FIXED ID MATCH ----------
    matches = df.index[df["_id"].astype(str) == str(product_id)]

    if len(matches) == 0:
        return []

    idx = matches[0]

    # ---------- similarity scores ----------
    scores = list(enumerate(similarity_matrix[idx]))

    scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:top_n+1]

    results = []

    for i, score in scores:
        product = df.iloc[i].to_dict()
        product["similarity_score"] = float(score)
        results.append(product)

    return results


# =====================================================
# OPTIONAL: MANUAL REFRESH (call when new products added)
# =====================================================
def refresh_similarity_engine():
    build_similarity_engine()
