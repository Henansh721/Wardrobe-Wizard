from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import json



class HomePage(Resource):

    def get(self):
        return {"Status" : "Success", 'Message' : "Hello"}, 201