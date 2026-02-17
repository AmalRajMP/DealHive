import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# load processed interaction data
df = pd.read_csv("datasets/user_interactions.csv")

# convert actions → scores
action_map = {
    "view": 1,
    "search": 2,
    "wishlist": 3,
    "add_to_cart": 4,
    "purchase": 5
}

df["score"] = df["action"].map(action_map)

# create user-product matrix
matrix = df.pivot_table(index="user_id", columns="product_id", values="score", fill_value=0)

# similarity between users
user_similarity = cosine_similarity(matrix)

similarity_df = pd.DataFrame(
    user_similarity,
    index=matrix.index,
    columns=matrix.index
)

# recommendation function
def recommend_for_user(user_id, top_n=5):

    if user_id not in matrix.index:
        return "User not found"

    # find similar users
    similar_users = similarity_df[user_id].sort_values(ascending=False)[1:6]

    # products liked by similar users
    similar_users_products = matrix.loc[similar_users.index]

    # weighted score
    recommendation_scores = similar_users_products.sum().sort_values(ascending=False)

    # remove already interacted products
    user_products = matrix.loc[user_id]
    recommendation_scores = recommendation_scores[user_products == 0]

    return recommendation_scores.head(top_n)

