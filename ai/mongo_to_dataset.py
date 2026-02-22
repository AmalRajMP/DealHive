import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv("../backend/.env")

client = MongoClient(os.getenv("MONGO_URI"))
db = client["dealhive_db"]

#Fetching user activity logs

logs = list(db.useractivities.find({
    "meta.productId": {"$exists": True}
}))

#Stores each product in the db to a dict with key (productId) and value (product_details)
products = {
    str(p["_id"]): p
    for p in db.products.find()
}

rows = []

for log in logs:

    pid = str(log["meta"]["productId"]) #Extracts productId

    product = products.get(pid, {}) #Stores product having pid as productId

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

#Convert action field to have only lower case letter without any trailing spaces
df["action"] = df["action"].str.lower().str.strip() 

os.makedirs("datasets", exist_ok=True)
df.to_csv("datasets/mongo_dataset.csv", index=False)

print("Shape:", df.shape)
