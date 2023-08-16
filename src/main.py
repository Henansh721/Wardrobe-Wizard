from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from PreferenceGeneratorResource import PreferenceGeneratorResource
from HomePage import HomePage
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
api = Api(app)

api.add_resource(PreferenceGeneratorResource, '/generate/preference')

api.add_resource(HomePage, '/')
  
if __name__ == '__main__':
    app.run(debug = True)