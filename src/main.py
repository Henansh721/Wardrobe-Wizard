from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from FashionOutfitGeneratorResource import FashionOutfitGeneratorResource

app = Flask(__name__)
api = Api(app)

api.add_resource(FashionOutfitGeneratorResource, '/generate/outfit')
  
if __name__ == '__main__':
    app.run(debug = True)