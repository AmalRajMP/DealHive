import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv(".env")

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI not found")

client = MongoClient(MONGO_URI)
db = client["dealhive_db"]
products_col = db["products"]

DF_CACHE = None
SIM_MATRIX = None


def build_similarity_engine():
    global DF_CACHE, SIM_MATRIX

    products = list(products_col.find())
    
    if not products:
        raise ValueError("No products found")

    df = pd.DataFrame(products)

    df["text_features"] = (
        df["title"].fillna("" + " " + df["description"].fillna(""))
    )
    
    vectorizer = TfidfVectorizer(stop_words="english")
    text_vectors = vectorizer.fit_transform(df["text_features"])
    text_sim = cosine_similarity(text_vectors)

    features = df[
        ["rating", "originalPrice", "discountPrice", "discountPercent"]
    ].fillna(0)

    features = pd.concat(
        [
            features,
            pd.get_dummies(df["category"], prefix="cat"),
            pd.get_dummies(df["brand"], prefix="brand"),
        ],
        axis=1,
    )

    scaler = StandardScaler()
    scaled = scaler.fit_transform(features)

    sim = cosine_similarity(scaled)

    DF_CACHE = df.reset_index(drop=True)
    SIM_MATRIX = (sim * 0.6) + (text_sim * 0.4)


build_similarity_engine()


def get_similar_products(product_id, top_n=10):
    global DF_CACHE, SIM_MATRIX

    if DF_CACHE is None or SIM_MATRIX is None:
        build_similarity_engine()

    df = DF_CACHE

    try:
        idx = df[df["_id"].astype(str) == str(product_id)].index[0]
    except:
        return []

    category = df.loc[idx, "category"]

    same_cat_indices = df[df["category"] == category].index.tolist()

    sims = [(i, SIM_MATRIX[idx][i]) for i in same_cat_indices if i != idx]
    sims.sort(key=lambda x: x[1], reverse=True)

    top = sims[:top_n]

    results = []
    for i, score in top:
        item = df.loc[i].to_dict()
        item["similarity_score"] = float(score)
        results.append(item)

    return results


def refresh_similarity_engine():
    build_similarity_engine()