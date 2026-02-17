import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler

# load data
df = pd.read_csv("datasets/products.csv")

# select useful features
features = df[[
    "price_original",
    "price_discounted",
    "discount_percentage",
    "category",
    "brand"
]]

features = pd.get_dummies(features, columns=["category","brand"], drop_first=True)

# scale values
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# similarity matrix
similarity = cosine_similarity(scaled_features)

# function to recommend
def recommend_products(product_id, top_n=5):
    matches = df[df["product_id"] == product_id]

    if matches.empty:
        return "Product not found"

    index = matches.index[0]

    scores = list(enumerate(similarity[index]))

    filtered = [s for s in scores if s[0] != index and s[1] > 0]

    sorted_scores = sorted(filtered, key=lambda x: x[1], reverse=True)[:top_n]

    product_indices = [i[0] for i in sorted_scores]

    selected = df.iloc[product_indices] #select rows
    return selected[["product_id","title","category","brand"]] #select columns



print(recommend_products(10))
