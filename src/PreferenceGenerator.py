from KeyVault import KeyVault
from UserDetail import UserDetails
from OpenAIUtil import OpenAIUtil
import json, re

class PrefernceGenerator():

    def __init__(self):
        self._openAIUtil = OpenAIUtil()

    def getPreferenceDetails(self, userDetailJson : UserDetails):
        _generateDetails = self.generateBodyStyleDetails(userDetailJson)
        _brandPreferenceList = self.generateFavouriteBrandList(userDetailJson)
        _colorPreferenceList = self.generateColorPreferenceList(userDetailJson)
        _generateDetails["user_Purchase_Brand_Name_Map"] = _brandPreferenceList
        _generateDetails["user_Style_Colors_Map"] = _colorPreferenceList

        return _generateDetails       

    def generateBodyStyleDetails(self, userDetailJson : UserDetails):
        chatCompletionObject = [{"role": "system", "content": KeyVault.getKeyValue("OPENAI_PREFERENCE_GENERATOR_SYSTEM_PROMPT")}]
        promptMessage = KeyVault.getKeyValue("OPENAI_PREFERENCE_GENERATOR_PROMPT").format(userAge = userDetailJson.userAge, userGender = userDetailJson.userGender, orderHistoryList = userDetailJson.orderHistoryList)
        chatCompletionObject.append({"role":"user", "content" : promptMessage})
        response = self._openAIUtil.CreateChatCompletion(chatCompletionObject= chatCompletionObject, temperature=0.7, maxTokens= 1000)

        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            json_string = match.group()
            jsonResponse = json.loads(json_string)
            return jsonResponse
        else:
            raise Exception("NO JSON FOUND IN OPENAI RESPONSE")
        
            
    def generateFavouriteBrandList(self, userDetailJson : UserDetails):
        _brandSet = {}

        for order in userDetailJson.orderHistoryList:
            if order["product_Brand_Name"] in _brandSet.keys():
                _brandSet[order["product_Brand_Name"]] += 1
            else:
                _brandSet[order["product_Brand_Name"]] = 1

        return _brandSet
    
    def generateColorPreferenceList(self, userDetailJson : UserDetails):
        _colorSet = {}

        for order in userDetailJson.orderHistoryList:
            if order["product_Color"] in _colorSet.keys():
                _colorSet[order["product_Color"]] += 1
            else:
                _colorSet[order["product_Color"]] = 1

        return _colorSet


        

        
    