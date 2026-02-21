from flask import Flask, jsonify
from flask_cors import CORS
from live_recommend import recommend_live

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route("/recommend/<user_id>")
def recommend(user_id):

    try:
        result = recommend_live(user_id)
        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error":"recommendation_engine_failed",
            "message":str(e)
        }),500


if __name__ == "__main__":
    app.run(port=5001,debug=True)