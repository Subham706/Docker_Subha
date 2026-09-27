from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/submit', methods=['POST'])
def handle_submit():
    data = request.get_json() if request.is_json else request.form.to_dict()
    name = data.get('name', 'Anonymous')
    email = data.get('email', 'N/A')
    message = data.get('message', '')

    return jsonify({
        "status": "success",
        "message": f"Hello {name}, your submission was processed by Flask!",
        "received_data": {
            "name": name,
            "email": email,
            "notes": message
        }
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)