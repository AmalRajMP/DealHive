import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# ======================
# LOAD ENV
# ======================
load_dotenv("../backend/.env")

client = MongoClient(os.getenv("MONGO_URI"))
db = client["dealhive_db"]

# ======================
# FETCH DATA
# ======================
logs = list(db.useractivities.find({
    "meta.productId": {"$exists": True}
}))

products = {
    str(p["_id"]): p
    for p in db.products.find()
}

rows = []

for log in logs:

    pid = str(log["meta"]["productId"])

    product = products.get(pid, {})

    rows.append({
        "user_id": str(log["user"]),
        "product_id": pid,
        "action": log["action"],
        "timestamp": log["createdAt"],
        "category": product.get("category", "unknown"),
        "brand": product.get("brand", "unknown"),
        "price": product.get("discountPrice", 0)
    })

df = pd.DataFrame(rows)

df["action"] = df["action"].str.lower().str.strip()

os.makedirs("datasets", exist_ok=True)
df.to_csv("datasets/mongo_dataset.csv", index=False)

print("Dataset rebuilt with product features")
print("Shape:", df.shape)
