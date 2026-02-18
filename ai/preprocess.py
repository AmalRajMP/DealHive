import pandas as pd

# ----------------------------
# Load Data
# ----------------------------
products = pd.read_csv("datasets/products.csv")
users = pd.read_csv("datasets/user_profiles.csv")
interactions = pd.read_csv("datasets/user_interactions.csv")

products.dropna(inplace=True)
users.dropna(inplace=True)
interactions.dropna(inplace=True)

# ----------------------------
# Merge
# ----------------------------
merged = interactions.merge(products, on="product_id")
final_df = merged.merge(users, on="user_id")

# ----------------------------
# Normalize Action Text
# ----------------------------
final_df["action"] = final_df["action"].str.lower().str.strip()

# ----------------------------
# Action Score Mapping (CORRECT VALUES)
# ----------------------------
action_map = {
    "view": 1,
    "search": 2,
    "wishlist": 3,
    "add_to_cart": 4,
    "purchase": 5,
    "update": 0
}

final_df["action_score"] = final_df["action"].map(action_map)

# ----------------------------
# Recency Feature
# ----------------------------
final_df["timestamp"] = pd.to_datetime(final_df["timestamp"])

latest_time = final_df["timestamp"].max()

final_df["days_since_interaction"] = (
    latest_time - final_df["timestamp"]
).dt.days

# ----------------------------
# User Interaction Stats
# ----------------------------
user_total = (
    final_df.groupby("user_id")["action_score"]
    .count()
    .reset_index()
    .rename(columns={"action_score": "user_total_interactions"})
)

user_purchase = (
    final_df[final_df["action"] == "purchase"]
    .groupby("user_id")["action"]
    .count()
    .reset_index()
    .rename(columns={"action": "purchase_count"})
)

user_features = user_total.merge(user_purchase, on="user_id", how="left")
user_features["purchase_count"] = user_features["purchase_count"].fillna(0)

user_features["user_purchase_ratio"] = (
    user_features["purchase_count"] /
    user_features["user_total_interactions"]
)

final_df = final_df.merge(
    user_features,
    on="user_id",
    how="left"
)

# ----------------------------
# Category Conversion Rate
# ----------------------------
category_total = (
    final_df.groupby("category")["action"]
    .count()
    .reset_index()
    .rename(columns={"action": "category_total"})
)

category_purchase = (
    final_df[final_df["action"] == "purchase"]
    .groupby("category")["action"]
    .count()
    .reset_index()
    .rename(columns={"action": "category_purchases"})
)

category_features = category_total.merge(
    category_purchase,
    on="category",
    how="left"
)

category_features["category_purchases"] = (
    category_features["category_purchases"].fillna(0)
)

category_features["category_conversion_rate"] = (
    category_features["category_purchases"] /
    category_features["category_total"]
)

final_df = final_df.merge(
    category_features[["category", "category_conversion_rate"]],
    on="category",
    how="left"
)

# ----------------------------
# Final Cleanup
# ----------------------------
final_df = final_df.fillna(0)

# ----------------------------
# Save
# ----------------------------
final_df.to_csv("datasets/final_dataset.csv", index=False)

print("Final dataset shape:", final_df.shape)
print(final_df.head())
