from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import json

from UserDetail import UserDetails
from PreferenceGenerator import PrefernceGenerator

class PreferenceGeneratorResource(Resource):

    def post(self):
        try:
            # {"userID" : "2131231231"}
            data = request.get_json()
            userDetail = UserDetails(data["userID"])
            preferenceGenerator = PrefernceGenerator()
            generateDetails = preferenceGenerator.getPreferenceDetails(userDetail)

            return { "Status" : "Success", "Value" : generateDetails , 'Message' : userDetail.updateUserDetails(generateDetails)}

        except Exception as ex:
            return jsonify({"Status" : "Failed", 'Message' : ex}), 500