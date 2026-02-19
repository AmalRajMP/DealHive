import pandas as pd
import numpy as np
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from sklearn.metrics.pairwise import cosine_similarity

# ----------------------------
# ENV
# ----------------------------
load_dotenv("../backend/.env")

client = MongoClient(os.getenv("MONGO_URI"))
db = client["dealhive_db"]

interactions_col = db["useractivities"]

# ----------------------------
# BUILD USER-ITEM MATRIX
# ----------------------------
def build_matrix():

    logs = list(interactions_col.find())

    if not logs:
        return None, None

    data = []

    for log in logs:

        user = str(log["user"])

        product = None
        if "meta" in log and isinstance(log["meta"], dict):
            product = log["meta"].get("productId")

        if product:
            data.append([user, str(product)])

    df = pd.DataFrame(data, columns=["user", "product"])

    # create interaction matrix
    matrix = pd.crosstab(df["user"], df["product"])

    return matrix, df


# ----------------------------
# FIND SIMILAR USERS
# ----------------------------
def get_similar_users(user_id, matrix, top_n=5):

    if user_id not in matrix.index:
        return []

    user_vector = matrix.loc[user_id].values.reshape(1, -1)

    similarities = cosine_similarity(user_vector, matrix.values)[0]

    scores = list(zip(matrix.index, similarities))

    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    similar_users = [u for u, s in scores[1:top_n+1]]

    return similar_users


# ----------------------------
# RECOMMEND PRODUCTS
# ----------------------------
def get_collaborative_recommendations(user_id, top_n=5):

    matrix, df = build_matrix()

    if matrix is None:
        return []

    similar_users = get_similar_users(user_id, matrix)

    if not similar_users:
        return []

    # products seen by similar users
    similar_data = df[df["user"].isin(similar_users)]

    # products already seen by current user
    user_products = set(df[df["user"] == user_id]["product"])

    # count frequency
    counts = (
        similar_data["product"]
        .value_counts()
        .reset_index()
    )

    counts.columns = ["product", "score"]

    # remove already interacted
    counts = counts[~counts["product"].isin(user_products)]

    return counts.head(top_n)["product"].tolist()
