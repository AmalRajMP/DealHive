import random
import pandas as pd
from pymongo import MongoClient
from datetime import datetime, timedelta
import os #To interact with the OS
from dotenv import load_dotenv #To read environment variables
from bson import ObjectId

#Load env vars
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

#print("Mongo URI =", os.getenv("MONGO_URI"))

NUM_USERS = 500
INTERACTIONS_PER_USER = 120
START_DATE = datetime.utcnow() - timedelta(days=90)

#Connect to DB
client = MongoClient(os.getenv("MONGO_URI"))
db = client["dealhive_db"]

products = list(db["products"].find())

if not products:
    raise Exception("No products found in DB")

categories = list(set(p.get("category") or "Unknown" for p in products)) #Stores all the categories in a list
brands = list(set(p.get("brand") or "Generic" for p in products)) #Stores all the brands in a list

#Generates a list of 500 unique MongoDB-style user IDs.
user_ids = [ObjectId() for _ in range(NUM_USERS)]

#Create random user behavior
def create_user_profile():
    return {
        "fav_category": random.choice(categories),
        "fav_brand": random.choice(brands),
        "budget": random.choice([5000, 10000, 20000, 50000])
    }

#Chooses user action according to the score
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
    profile = create_user_profile() #Generates random user profile

    #Generates each user's fav products pool
    preferred_products = random.sample(products, k=min(20, len(products)))

    #To simulate multiple actions for the user
    for _ in range(INTERACTIONS_PER_USER):
        if random.random() < 0.65:
            product = random.choice(preferred_products) #choose any product from the prefered products
        else:
            product = random.choice(products) #choose any other product

        #Store the price of the selected product
        price = float(product.get("discountPrice") or product.get("price") or 0) 

        score_boost = 0

        #If the products features matches user's preferences, increase the score
        #We will use this score to set the action (View/Purchase/Add to cart ...)
        if (product.get("category") or "Unknown") == profile["fav_category"]:
            score_boost += 0.25

        if (product.get("brand") or "Generic") == profile["fav_brand"]:
            score_boost += 0.25

        if price <= profile["budget"]:
            score_boost += 0.2

        action = choose_action(score_boost) #Stores the generated action

        timestamp = START_DATE + timedelta(days=random.randint(0, 90))

        # Mongo document
        mongo_logs.append({
            "user": user_id,
            "action": action,
            #Container for more product infos
            "meta": {
                "productId": product["_id"]
            },
            "createdAt": timestamp,
            "updatedAt": timestamp,
            "__v": 0, #0 indicates new record
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

#Insert logs into mongoDB

db["useractivities"].insert_many(mongo_logs)

print("Inserted:", len(mongo_logs), "documents")

df = pd.DataFrame(csv_rows) #Converts to table format

os.makedirs("datasets", exist_ok=True) #Creates a directory if not exists
df.to_csv("datasets/synthetic_interactions.csv", index=False) #index = False means do not store indexes

print("CSV dataset saved")
print("Total rows:", len(df))
