from OpenAIUtil import OpenAIUtil
import requests
import json
from KeyVault import KeyVault

GET_ENDPOINT = KeyVault.getKeyValue("USER_GET_ENDPOINT")
UPDATE_ENDPOINT = KeyVault.getKeyValue("USER_UPDATE_ENDPOINT")

class UserDetails:
    def __init__(self, userID):
        self.userId = userID
        self.userName = ""
        self.userEmail = ""
        self.userGender = ""
        self.userMobileNum = ""
        self.userAddress = {}
        self.userAge = -1
        self.orderHistoryList = []
        self.userBodyType = ""
        self.userStyleTagsList = []
        self.userPurchaseBrandNameMap = {}
        self.setDetails()
    
    def setDetails(self):
        _userDetails = self.fetchUserDetails()

        self.userName = _userDetails["user_Name"]
        self.userEmail = _userDetails["user_Email_Id"]
        self.userGender = _userDetails["user_Gender"]
        self.userMobileNum = _userDetails["user_Mobile_Number"]
        self.userAge = _userDetails["user_Age"]
        self.userBodyType = _userDetails["user_Body_Type"]
        self.userStyleTagsList = _userDetails["user_Style_Tags_List"]
        self.userPurchaseBrandNameMap = _userDetails["user_Purchase_Brand_Name_Map"]
        self.userAddress = _userDetails["user_Address"]
        self.orderHistoryList = _userDetails["order_History_List"]

    def fetchUserDetails(self):
        response = requests.get(GET_ENDPOINT+self.userId)
        return json.loads(response.content)
    
    def updateUserDetails(self, userDetailsJson):
        updateURL = UPDATE_ENDPOINT + self.userId + "&user_Body_Type=" + json.dumps(userDetailsJson["user_Body_Type"])+ "&user_Style_Tags_List=" + json.dumps(userDetailsJson["user_Style_Tags_List"])+ "&user_Purchase_Brand_Name_Map=" + json.dumps(userDetailsJson["user_Purchase_Brand_Name_Map"]) + "&user_Style_Colors_Map=" + json.dumps(userDetailsJson["user_Style_Colors_Map"])
        response = requests.get(updateURL)  
          
        return response.status_code
    
    def getUserDetailsJson(self):
        return {
            'Age' : self.userAge,
            'Gender' : self.userGender,
            'Region' : self.userAddress,
            'Body Type' : self.userBodyType,
            'Brand Preference' : self.userPurchaseBrandNameMap,
            'Style Tags' : self.userStyleTagsList,
        }

