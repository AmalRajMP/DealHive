import random
import pandas as pd
from pymongo import MongoClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# =========================
# LOAD ENV
# =========================
load_dotenv(os.path.join(os.path.dirname(__file__), "../backend/.env"))

print("Mongo URI =", os.getenv("MONGO_URI"))

# =========================
# CONFIG
# =========================
NUM_USERS = 500
INTERACTIONS_PER_USER = 120
START_DATE = datetime.now() - timedelta(days=90)

# =========================
# CONNECT DB
# =========================
client = MongoClient(os.getenv("MONGO_URI"))
db = client["dealhive_db"]
products = list(db["products"].find())

if not products:
    raise Exception("No products found in DB")

product_ids = [str(p["_id"]) for p in products]

categories = list(set(p.get("category") or "Unknown" for p in products))
brands = list(set(p.get("brand") or "Generic" for p in products))

# =========================
# USER PROFILE GENERATOR
# =========================
def create_user_profile():
    return {
        "fav_category": random.choice(categories),
        "fav_brand": random.choice(brands),
        "budget": random.choice([5000, 10000, 20000, 50000])
    }

# =========================
# ACTION PROBABILITIES
# =========================
def choose_action():
    r = random.random()
    if r < 0.55:
        return "Viewed Product"
    elif r < 0.75:
        return "Added To Wishlist"
    elif r < 0.92:
        return "Added To Cart"
    else:
        return "Purchased"

# =========================
# GENERATE INTERACTIONS
# =========================
rows = []

for user_index in range(NUM_USERS):

    user_id = f"user_{user_index}"
    profile = create_user_profile()

    for _ in range(INTERACTIONS_PER_USER):

        product = random.choice(products)
        price = float(product.get("price") or 0)

        score_boost = 0

        # preference bias
        if (product.get("category") or "Unknown") == profile["fav_category"]:
            score_boost += 0.25

        if (product.get("brand") or "Generic") == profile["fav_brand"]:
            score_boost += 0.25

        if price <= profile["budget"]:
            score_boost += 0.2

        # choose action influenced by preference
        if random.random() < score_boost:
            action = random.choices(
                ["Added To Cart", "Purchased", "Added To Wishlist"],
                weights=[0.4, 0.3, 0.3]
            )[0]
        else:
            action = choose_action()

        rows.append({
            "user_id": user_id,
            "product_id": str(product["_id"]),
            "category": product.get("category") or "Unknown",
            "brand": product.get("brand") or "Generic",
            "price": price,
            "action": action,
            "timestamp": START_DATE + timedelta(days=random.randint(0, 90))
        })

# =========================
# SAVE DATASET
# =========================
df = pd.DataFrame(rows)

os.makedirs("datasets", exist_ok=True)
df.to_csv("datasets/synthetic_interactions.csv", index=False)

print("Dataset generated successfully")
print("Total rows:", len(df))
