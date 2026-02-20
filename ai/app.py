from flask import Flask, jsonify
from live_recommend import recommend_live
import json

app = Flask(__name__)

@app.route("/recommend/<user_id>")
def recommend(user_id):
    result = recommend_live(user_id)

    if isinstance(result, str):
        return jsonify({"error": result})

    return app.response_class(
        json.dumps(result, indent=2),
        mimetype="application/json"
    )

if __name__ == "__main__":
    app.run(port=5001)
