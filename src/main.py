from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from FashionOutfitGeneratorResource import FashionOutfitGeneratorResource
from flask_cors import CORS

from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

api.add_resource(FashionOutfitGeneratorResource, '/generate/outfit')
  
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)