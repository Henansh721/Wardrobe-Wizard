from KeyVault import KeyVault
from FashionTrends import FashionTrends
from UserDetail import UserDetails

import re, json, requests

GET_CHAT_COMPLETION_ENDPOINT = KeyVault.getKeyValue("GET_CHAT_COMPLETION_ENDPOINT")
PUSH_CHAT_COMPLETION_ENDPOINT = KeyVault.getKeyValue("PUSH_CHAT_COMPLETION_ENDPOINT")


class ChatCompletionObject:
    def __init__(self):
        pass

    def fetchFashionCompletionMessages(self, _userID):
        print("Value-->>",GET_CHAT_COMPLETION_ENDPOINT+_userID)
        response = requests.get(GET_CHAT_COMPLETION_ENDPOINT+_userID)
        return json.loads(response.content)
    
    def pushFashionCompletionMessages(self, _responseJson):

        response = requests.post(PUSH_CHAT_COMPLETION_ENDPOINT, json= _responseJson)
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

        chatCompletionObject = [{"role": "system", "content": KeyVault.getKeyValue("OPENAI_FASHION_GENERATOR_SYSTEM_PROMPT").format(Basic_Customer_Details = userDetail.getUserDetailsJson(), Overall_Fashion_Trends = globalFashiontrends["SOCIAL_TRENDS"], Influencers_Outfit_Descp = globalFashiontrends["INFLUENCER_TRENDS"])}]

        _systemPrompt = {
            "userId" : _userID,
            "prompt" : {
                "type" : "system",
                "displayMsg" : "None",
                "promptMsg" : chatCompletionObject[0]["content"],
                "responseList" : []
            }
        }

        respose = self.pushFashionCompletionMessages(_systemPrompt)

        if respose != 201:
            raise Exception("Unable to Push System Prompt in DB")

        return chatCompletionObject

    
    def getFashionPromptsFromDB(self, _userID):
        chatCompletionObject = []
        _chatMessages = self.fetchFashionCompletionMessages(_userID)

        for _chat in _chatMessages:
            _message = {"role":_chat["type"], "content" : json.dumps(_chat["promptMsg"])}
            chatCompletionObject.append(_message)

        return chatCompletionObject








    