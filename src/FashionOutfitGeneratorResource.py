from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import json

from FashionGenerator import FashionGenerator

class FashionOutfitGeneratorResource(Resource):

    def post(self):
        try:
            # {"userID" : "2131231231", "prompt" : "Hello"}
            data = request.get_json()

            _fashionGenerator = FashionGenerator(data["userID"], data["prompt"])
            _fashionResponse = _fashionGenerator.getGeneratorResponse()

            return { "Status" : "Success", "Value" : _fashionResponse , 'Message' : "Hello There ....."}

        except Exception as ex:
            return jsonify({"Status" : "Failed", 'Message' : ex}), 500