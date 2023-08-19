from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from PreferenceGeneratorResource import PreferenceGeneratorResource
from HomePage import HomePage
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

api.add_resource(PreferenceGeneratorResource, '/generate/preference')

api.add_resource(HomePage, '/')
  
if __name__ == '__main__':
    app.run(host='0.0.0.0')