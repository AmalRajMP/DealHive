from flask import Flask, jsonify
from flask_cors import CORS
from live_recommend import recommend_live
import json
import math

app = Flask(__name__)

# Enable CORS for React frontend
CORS(app, origins=["http://localhost:3000"])

@app.route("/recommend/<user_id>")
def recommend(user_id):
    result = recommend_live(user_id)

    if isinstance(result, str):
        return jsonify({"error": result})

    def clean_nan(obj):
        if isinstance(obj, dict):
            return {k: clean_nan(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [clean_nan(v) for v in obj]
        elif isinstance(obj, float) and math.isnan(obj):
            return None
        return obj

    cleaned = clean_nan(result)

    return jsonify(cleaned)

if __name__ == "__main__":
    app.run(port=5001, debug=True)