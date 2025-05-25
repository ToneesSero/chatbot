from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import os
from nlp_module import get_bot_answer, get_bot_response


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
REACT_BUILD_DIR = os.path.join(BASE_DIR, "../frontend/build")

app = Flask(__name__, static_folder=REACT_BUILD_DIR, static_url_path="/")
CORS(app)

# API
@app.route("/api/message")
def get_message():
    return jsonify({"message": "Привет от Flask!"})

@app.route("/api/nlp", methods=["POST"])
def nlp_api():
    data = request.get_json()
    user_input = data.get("message", "")
    answer = get_bot_answer(user_input)

    response = get_bot_response(user_input)
    response["needs_clarification"] = bool(response["needs_clarification"])


    return jsonify(answer=answer, response=response)


# Роутинг react
@app.route("/<path:path>")
def serve_react(path):
    file_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)