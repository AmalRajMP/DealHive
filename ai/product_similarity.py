import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv("../backend/.env")

client = MongoClient(os.getenv("MONGO_URI"))
db = client["dealhive_db"]
products_col = db["products"]

products = list(products_col.find())

df = pd.DataFrame(products)

# numeric features
features = df[[
    "rating",
    "originalPrice",
    "discountPrice",
    "discountPercent"
]]

# encode category + brand
features = pd.concat([
    features,
    pd.get_dummies(df["category"]),
    pd.get_dummies(df["brand"])
], axis=1)

scaler = StandardScaler()
scaled = scaler.fit_transform(features)

similarity_matrix = cosine_similarity(scaled)

def get_similar_products(product_id, top_n=5):

    idx = df.index[df["id"] == product_id][0]

    scores = list(enumerate(similarity_matrix[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:top_n+1]

    product_indices = [i[0] for i in scores]

    return df.iloc[product_indices].to_dict(orient="records")
