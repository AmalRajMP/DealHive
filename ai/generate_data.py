import random
import pandas as pd
from pymongo import MongoClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from bson import ObjectId

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
START_DATE = datetime.utcnow() - timedelta(days=90)

# =========================
# CONNECT DB
# =========================
client = MongoClient(os.getenv("MONGO_URI"))
db = client["dealhive_db"]

products = list(db["products"].find())

if not products:
    raise Exception("No products found in DB")

categories = list(set(p.get("category") or "Unknown" for p in products))
brands = list(set(p.get("brand") or "Generic" for p in products))

# =========================
# CREATE REAL USER IDS
# =========================
user_ids = [ObjectId() for _ in range(NUM_USERS)]

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
# ACTION LOGIC
# =========================
def choose_action(score_boost):

    if score_boost >= 0.6:
        return random.choices(
            ["Placed Order","Added To Cart","Added To Wishlist"],
            weights=[0.6,0.25,0.15]
        )[0]

    elif score_boost >= 0.3:
        return random.choices(
            ["Added To Cart","Added To Wishlist","Viewed Product","Placed Order"],
            weights=[0.35,0.35,0.2,0.1]
        )[0]

    else:
        return random.choices(
            ["Viewed Product","Added To Wishlist","Added To Cart"],
            weights=[0.6,0.3,0.1]
        )[0]


# =========================
# GENERATE INTERACTIONS
# =========================
mongo_logs = []
csv_rows = []

for user_index in range(NUM_USERS):

    user_id = user_ids[user_index]
    profile = create_user_profile()

    # user prefers certain products more often
    preferred_products = random.sample(products, k=min(20, len(products)))

    for _ in range(INTERACTIONS_PER_USER):

        # bias toward preferred products
        if random.random() < 0.65:
            product = random.choice(preferred_products)
        else:
            product = random.choice(products)

        price = float(product.get("discountPrice") or product.get("price") or 0)

        score_boost = 0

        # preference boosts
        if (product.get("category") or "Unknown") == profile["fav_category"]:
            score_boost += 0.25

        if (product.get("brand") or "Generic") == profile["fav_brand"]:
            score_boost += 0.25

        if price <= profile["budget"]:
            score_boost += 0.2

        action = choose_action(score_boost)

        timestamp = START_DATE + timedelta(days=random.randint(0, 90))

        # Mongo document
        mongo_logs.append({
            "user": user_id,
            "action": action,
            "meta": {
                "productId": product["_id"]
            },
            "createdAt": timestamp,
            "updatedAt": timestamp,
            "__v": 0,
            "isSynthetic": True
        })

        # CSV row (for training dataset)
        csv_rows.append({
            "user_id": str(user_id),
            "product_id": str(product["_id"]),
            "category": product.get("category") or "Unknown",
            "brand": product.get("brand") or "Generic",
            "price": price,
            "action": action,
            "timestamp": timestamp
        })

# =========================
# INSERT INTO MONGODB
# =========================
print("Inserting logs into MongoDB...")

db["useractivities"].insert_many(mongo_logs)

print("Inserted:", len(mongo_logs), "documents")

# =========================
# SAVE CSV BACKUP
# =========================
df = pd.DataFrame(csv_rows)

os.makedirs("datasets", exist_ok=True)
df.to_csv("datasets/synthetic_interactions.csv", index=False)

print("CSV dataset saved")
print("Total rows:", len(df))
