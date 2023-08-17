from KeyVault import KeyVault
from FashionTrends import FashionTrends
from UserDetail import UserDetails

import re, json, requests

GET_CHAT_COMPLETION_ENDPOINT = KeyVault.getKeyValue("GET_CHAT_COMPLETION_ENDPOINTT")
PUSH_CHAT_COMPLETION_ENDPOINT = KeyVault.getKeyValue("PUSH_CHAT_COMPLETION_ENDPOINTT")


class ChatCompletionObject:
    def __init__(self):
        pass

    def fetchFashionCompletionMessages(self, _userID):
        response = requests.get(GET_CHAT_COMPLETION_ENDPOINT+_userID)
        return json.loads(response)
    
    def pushFashionCompletionMessages(self, _responseJson):

        response = requests.push(PUSH_CHAT_COMPLETION_ENDPOINT, json= _responseJson)
        return response.status_code
    

    def getFashionCompletionPrompt(self, _userID, _fashionPrompt):
        _chatCompletionObject = self.getFashionPromptsFromDB(_userID)
        
        if len(_chatCompletionObject) == 0:
            return self.createFashionPrompts(_userID, _fashionPrompt)
        
        return _chatCompletionObject


    def fetchInputParameters(self, _userID, _fashionPrompt):
        userDetail = UserDetails(_userID)
        fashionTrends = FashionTrends(_fashionPrompt)
        globalFashiontrends = fashionTrends.getGlobalFashionTrends()

        return (userDetail, globalFashiontrends)
    
    
    def createFashionPrompts(self, _userID, _fashionPrompt):
        (userDetail, globalFashiontrends) = self.fetchInputParameters(_userID, _fashionPrompt)

        chatCompletionObject = [{"role": "system", "content": KeyVault.getKeyValue("OPENAI_FASHION_GENERATOR_SYSTEM_PROMPT").format(Basic_Customer_Details = userDetail.getUserDetailsJson, Overall_Fashion_Trends = globalFashiontrends["SOCIAL_TRENDS"], Influencers_Outfit_Descp = globalFashiontrends["INFLUENCER_TRENDS"])}]

        return chatCompletionObject

    
    def getFashionPromptsFromDB(self, _userID):
        chatCompletionObject = []
        _chatMessages = self.fetchFashionCompletionMessages(_userID)

        for e in _chatMessages:
            _chat = json.load(e)
            _message = {"role":_chat["type"], "content" : _chat["textMsg"]}
            chatCompletionObject.append(_message)

        return chatCompletionObject








    