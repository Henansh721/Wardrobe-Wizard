from flask import Flask, request, jsonify
from generateImageUrl import *
import os
from decouple import config

from flask_cors import CORS

from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/getFlipkartProductFromBing', methods=['POST'])
def submit_data():
    try:
        data = request.json  # Get JSON data from the request
        if data is None:
            return jsonify({'error': 'Invalid JSON data'}), 400
        
        # Process the JSON data (you can modify this as needed)
        result = process_data(data)
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def process_data(data):
    # Implement your data processing logic here
    # For example, you can iterate through key-value pairs and perform operations
    
    result = {}  # Placeholder for processed data
    
    for key, value in data.items():
        # do an api call to bing image extractor to get the image
        bing_api = BingImageSearchAPI(os.getenv('subscription_key'))
        thumbnail_url = bing_api.search_images(value + " Flipkart")
        result[key] = thumbnail_url
    
    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0')
