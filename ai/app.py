from flask import Flask, jsonify
from flask_cors import CORS
from live_recommend import recommend_live
from product_similarity import get_similar_products

import math

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


# ==========================================
# USER RECOMMENDATIONS (HOME PAGE)
# ==========================================
@app.route("/recommend/<user_id>")
def recommend(user_id):
    try:
        result = recommend_live(user_id)
        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": "recommendation_engine_failed",
            "message": str(e)
        }), 500

def convert_objectids(obj):
    if isinstance(obj, list):
        return [convert_objectids(i) for i in obj]

    if isinstance(obj, dict):
        return {k: convert_objectids(v) for k, v in obj.items()}

    # fix ObjectId
    if str(type(obj)).endswith("ObjectId'>"):
        return str(obj)

    # fix NaN
    if isinstance(obj, float) and math.isnan(obj):
        return None

    return obj


@app.route("/recommend/similar/<product_id>")
def similar(product_id):
    try:
        products = get_similar_products(product_id, top_n=10)

        for p in products:
            p["why"] = "Similar product"
            p.pop("similarity_score", None)

        products = convert_objectids(products) 

        return jsonify({
            "type": "similar",
            "products": products
        })

    except Exception as e:
        return jsonify({
            "error": "similar_engine_failed",
            "message": str(e)
        }), 500
    
if __name__ == "__main__":
    app.run(port=5001, debug=True)