from KeyVault import KeyVault
from OpenAIUtil import OpenAIUtil
from FashionTrends import FashionTrends
from ChatCompletionObject import ChatCompletionObject 
import re, json
import concurrent.futures


class FashionGenerator:
    def __init__(self, _userID, _prompt):
        self.userID = _userID
        self.fashionPrompt = _prompt
        self._openAIUtil = OpenAIUtil()
        self.fashionTrend = FashionTrends(_userID, _prompt)
        self.chatCompletionObject = ChatCompletionObject()

    def getGeneratorResponse(self):
        _personalizedTrends = json.loads(self.fashionTrend.getPersonalFashionTrends())
       
        _fashionOutfitDescp = self.generateFashionableOutfitDescription(_personalizedTrends)

        _urlResponseList = self.getProductMatches(_fashionOutfitDescp)

        _responseJson = {
            "userId" : self.userID,
            "prompt" : {
                "type" : "assistant",
                "dispMsg" : "Generated Outfits - ",
                "promptMsg" : _fashionOutfitDescp,
                "responseList" : _urlResponseList
            }
        }

        _pushToDB = self.chatCompletionObject.pushFashionCompletionMessages(_responseJson)
        
        return _pushToDB


    def generateFashionableOutfitDescription(self, _personalizedTrends):
        
        chatCompletionObject = self.chatCompletionObject.getFashionCompletionPrompt(self.userID, self.fashionPrompt)

        promptMessage = KeyVault.getKeyValue("OPENAI_FASHION_GENERATOR_PROMPT").format(Customer_Prompt = self.fashionPrompt, Customer_Fashion_Trends = _personalizedTrends["SOCIAL_TRENDS"], Customer_Influencer_Trends = _personalizedTrends["INFLUENCER_TRENDS"])

        chatCompletionObject.append({"role":"user", "content" : promptMessage})

        _userJson = {
            "userId" : self.userID,
            "prompt" : {
                "type" : "user",
                "dispMsg" : self.fashionPrompt,
                "promptMsg" : promptMessage,
                "responseList" : []
            }
        }

        with concurrent.futures.ThreadPoolExecutor() as executor:
            _openAISubmission = executor.submit(self._openAIUtil.CreateChatCompletion(chatCompletionObject= chatCompletionObject, temperature=0.7, maxTokens= 1000))
            _pushToDB = executor.submit(self.chatCompletionObject.pushFashionCompletionMessages(_userJson))

        response = _openAISubmission.result()
        _dbResponse = _pushToDB.result()
        
        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            json_string = match.group()
            jsonResponse = json.loads(json_string)
            return jsonResponse
        else:
            raise Exception("NO JSON FOUND IN OPENAI RESPONSE")
        
    def getProductMatches(self, outfitDescription):
        return [{"imgUrl" : "Hello", "flipkartUrl" : ""}]
