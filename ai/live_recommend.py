import pandas as pd
import joblib
import os
import shap
import numpy as np
import math
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
from product_similarity import get_similar_products
from collaborative_filter import get_collaborative_recommendations
from xai_model import model_predict

# =================================================
# LOAD ENV + DATABASE
# =================================================

load_dotenv("../backend/.env")

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["dealhive_db"]

interactions_col = db["useractivities"]
products_col = db["products"]
orders_col = db["orders"]

# =================================================
# LOAD MODEL
# =================================================

model = joblib.load("models/recommender_model.pkl")

background = np.array([
    [0,0,0],
    [0.5,0.2,0.1],
    [1,1,1]
])

explainer = shap.Explainer(model_predict, background, algorithm="permutation")

# =================================================
# UTILS
# =================================================

def convert_objectids(obj):
    if isinstance(obj,list):
        return [convert_objectids(i) for i in obj]
    if isinstance(obj,dict):
        return {k:convert_objectids(v) for k,v in obj.items()}
    if isinstance(obj,ObjectId):
        return str(obj)
    return obj


def clean_nan(obj):
    if isinstance(obj, dict):
        return {k: clean_nan(v) for k,v in obj.items()}
    if isinstance(obj, list):
        return [clean_nan(v) for v in obj]
    if isinstance(obj, float) and math.isnan(obj):
        return None
    return obj


def deduplicate(products):
    seen=set()
    unique=[]
    for p in products:
        pid=str(p.get("_id"))
        if pid not in seen:
            seen.add(pid)
            unique.append(p)
    return unique


# =================================================
# TRENDING
# =================================================

def get_trending_products(limit=20):

    pipeline = [
        {"$match":{"meta.productId":{"$exists":True}}},
        {"$group":{"_id":"$meta.productId","count":{"$sum":1}}},
        {"$sort":{"count":-1}},
        {"$limit":limit}
    ]

    ids=[i["_id"] for i in interactions_col.aggregate(pipeline)]

    if not ids:
        return []

    products=list(products_col.find({"_id":{"$in":ids}}))

    for p in products:
        p["source"]="trending"
        p["why"]="Popular among users right now"

    return products


# =================================================
# USER PROFILE BUILDER
# =================================================

def build_user_features(user_id):

    try:
        uid = ObjectId(user_id)
    except:
        return None, [], {"products":{}, "categories":{}}

    logs=list(
        interactions_col
        .find({"user":uid})
        .sort("_id",-1)
        .limit(200)
    )

    if not logs:
        return None, [], {"products":{}, "categories":{}}

    product_ids=[]
    product_actions={}
    category_actions={}

    for log in logs:

        action=str(log.get("action","")).lower()
        meta=log.get("meta",{})

        pid=meta.get("productId")
        name=None
        cat=None

        if pid:
            try:
                pid=ObjectId(pid)
                product_ids.append(pid)

                prod=products_col.find_one({"_id":pid},{"title":1,"category":1})
                if prod:
                    name=prod.get("title")
                    cat=str(prod.get("category","")).lower()
            except:
                pass

        # ---------- PRODUCT ACTION ----------
        if name:
            product_actions.setdefault(name,[]).append(action)

        # ---------- CATEGORY ACTION ----------
        if cat:
            category_actions.setdefault(cat,[]).append(action)

        # ---------- ORDER PURCHASE ----------
        if "order" in action and "orderId" in meta:

            order = orders_col.find_one({"_id":ObjectId(meta["orderId"])})

            if order:
                for item in order.get("items",[]):

                    try:
                        prod=products_col.find_one(
                            {"_id":ObjectId(item["product"])},
                            {"title":1,"category":1}
                        )

                        if prod:
                            pname=prod["title"]
                            pcat=str(prod.get("category","")).lower()

                            product_actions.setdefault(pname,[]).append("purchase")
                            category_actions.setdefault(pcat,[]).append("purchase")

                    except:
                        pass

    features=pd.DataFrame([{
        "user_total_interactions":len(logs),
        "user_purchase_ratio":
            sum(1 for log in logs if "order" in str(log.get("action","")).lower())
            / len(logs)
    }])

    return features, product_ids, {
        "products":product_actions,
        "categories":category_actions
    }


# =================================================
# EXPLANATION ENGINE
# =================================================

def action_reason(action,name,mode="product"):

    if mode=="product":

        if "purchase" in action:
            return f"You purchased {name} before"

        if "cart" in action:
            return f"Because you added {name} to cart"

        if "wishlist" in action:
            return f"Because you saved {name}"

        if "view" in action:
            return f"Because you viewed {name}"

    else:

        if "purchase" in action:
            return f"Because you often buy {name} products"

        if "cart" in action:
            return f"Because you add {name} items to cart"

        if "wishlist" in action:
            return f"Because you save {name} products"

        if "view" in action:
            return f"Because you viewed {name} products"

    return None


def get_behavior_reason(product,profile):

    title=product.get("title")
    category=str(product.get("category","")).lower()

    # ---------- PRODUCT MATCH ----------
    actions=profile["products"].get(title)
    if actions:
        for p in ["purchase","cart","wishlist","view"]:
            for act in actions:
                if p in act:
                    return action_reason(act,title,"product")

    # ---------- CATEGORY MATCH ----------
    cat_actions=profile["categories"].get(category)
    if cat_actions:
        for p in ["purchase","cart","wishlist","view"]:
            for act in cat_actions:
                if p in act:
                    return action_reason(act,category,"category")

    return None


def build_explanation(reason,count,source):

    if source=="trending":
        return "Popular among users right now"

    if reason:
        return reason

    if source=="collaborative":
        return "Users with similar interests liked this"

    if count>40:
        return "Recommended because you frequently shop on DealHive"

    if count>15:
        return "Recommended based on your activity"

    return "Recommended for you"


# =================================================
# MAIN ENGINE
# =================================================

def recommend_live(user_id):

    features, product_ids, profile = build_user_features(user_id)

    # ---------- NEW USER ----------
    if not product_ids:

        trending=get_trending_products()

        return {
            "user":user_id,
            "userType":"new",
            "recommendations":{
                "recent":[],
                "trending":convert_objectids(trending),
                "hybrid":[]
            }
        }

    # ---------- MODEL SCORE ----------
    try:
        features=features.reindex(columns=model.feature_names_in_,fill_value=0)
        prob=float(model.predict_proba(features)[0][1])
    except:
        prob=0.5

    # ---------- CONTENT ----------
    last=product_ids[0]
    content=get_similar_products(last) or []

    for p in content:
        p["source"]="content"

    # ---------- COLLAB ----------
    collab_ids=get_collaborative_recommendations(user_id)

    collab=[]
    if collab_ids:
        collab=list(products_col.find({
            "_id":{"$in":[ObjectId(i) for i in collab_ids]}
        }))

    for p in collab:
        p["similarity_score"]=0.3
        p["source"]="collaborative"

    # ---------- MERGE ----------
    rec = deduplicate(content + collab)

    if not rec:
        rec=get_trending_products()

    # ---------- RANK ----------
    scored=[]
    interaction_count=len(product_ids)

    for p in rec:

        sim=(p.get("similarity_score",0)+1)/2
        score=(sim*0.8)+(prob*0.2)

        p["final_score"]=round(score,4)
        scored.append(p)

    scored=sorted(scored,key=lambda x:x["final_score"],reverse=True)

    # ---------- FINAL ----------
    final=[]

    for p in scored:

        reason=get_behavior_reason(p,profile)
        p["why"]=build_explanation(reason,interaction_count,p.get("source"))
        final.append(p)

        if len(final)==20:
            break

    return clean_nan({
        "user":user_id,
        "userType":"existing",
        "interest_score":prob,
        "recommendations":{
            "recent":convert_objectids(content[:10]),
            "trending":convert_objectids(get_trending_products(10)),
            "hybrid":convert_objectids(final)
        }
    })