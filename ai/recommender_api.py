from flask import Flask, jsonify
from user_recommend import recommend_for_user

app = Flask(__name__)

@app.route("/recommend/<int:user_id>")
def recommend(user_id):
    result = recommend_for_user(user_id)

    if isinstance(result, str):
        return jsonify({"error": result})

    return jsonify(result.index.tolist())

if __name__ == "__main__":
    app.run(port=5001)
