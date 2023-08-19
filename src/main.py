from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from OutfitLinkFetcher import OutfitLinkFetcher

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/getFlipkartProductFromBing', methods=['POST'])
def submit_data():

    try:
        data = request.json
        result = OutfitLinkFetcher().getOutfitLink(data)
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0')
