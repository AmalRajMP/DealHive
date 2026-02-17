import pandas as pd

products = pd.read_csv("datasets/products.csv")
users = pd.read_csv("datasets/user_profiles.csv")
interactions = pd.read_csv("datasets/user_interactions.csv")

products.dropna(inplace=True)
users.dropna(inplace=True)
interactions.dropna(inplace=True)

merged = interactions.merge(products, on="product_id")
final_df = merged.merge(users, on="user_id")

# Feature Engineering Section

action_map = {
    "view": 1,
    "search": 2,
    "wishlist": 3,
    "add_to_cart": 4,
    "purchase": 5,
    "update": 0
}

final_df["action_score"] = final_df["action"].map(action_map)


print("Final dataset shape:", final_df.shape)
print(final_df.head())

print("Final dataset shape:", final_df.shape)
print(final_df.head())
print(interactions["action"].unique())
