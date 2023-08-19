from KeyVault import KeyVault
from OpenAIUtil import OpenAIUtil
from FashionTrends import FashionTrends
from ChatCompletionObject import ChatCompletionObject
import re, json, requests
from concurrent import futures


class FashionGenerator:
    def __init__(self, _userID, _prompt):
        self.userID = _userID
        self.fashionPrompt = _prompt
        self._openAIUtil = OpenAIUtil()
        self.fashionTrend = FashionTrends(_prompt)
        self.chatCompletionObject = ChatCompletionObject()

    def getGeneratorResponse(self):

        _fashionOutfitDescp = self.generateFashionableOutfitDescription()

        _urlResponseList = self.getProductMatches(_fashionOutfitDescp)

        if _fashionOutfitDescp["status"] == 'fashion outfit generated':
            _responseJson = {
                "userId": self.userID,
                "prompt": {
                    "type": "assistant",
                    "displayMsg": "Here are the Outfits for you.",
                    "promptMsg": _fashionOutfitDescp,
                    "responseList": _urlResponseList
                }
            }
        else:
            _responseJson = {
                "userId": self.userID,
                "prompt": {
                    "type": "assistant",
                    "displayMsg": _fashionOutfitDescp["message"],
                    "promptMsg": _fashionOutfitDescp,
                    "responseList": []
                }
            }

        _pushToDB = self.chatCompletionObject.pushFashionCompletionMessages(_responseJson)

        return _responseJson

    def generateFashionableOutfitDescription(self):

        chatCompletionObject = self.chatCompletionObject.getFashionCompletionPrompt(self.userID, self.fashionPrompt)

        promptMessage = KeyVault.getKeyValue("OPENAI_FASHION_GENERATOR_PROMPT").format(
            Customer_Prompt=self.fashionPrompt)

        chatCompletionObject.append({"role": "user", "content": promptMessage})

        _userJson = {
            "userId": self.userID,
            "prompt": {
                "type": "user",
                "displayMsg": self.fashionPrompt,
                "promptMsg": promptMessage,
                "responseList": []
            }
        }

        with futures.ThreadPoolExecutor() as executor:
            _openAISubmission = executor.submit(self._openAIUtil.CreateChatCompletion ,chatCompletionObject=chatCompletionObject, temperature=0.7,maxTokens=1000)
            _pushToDB = executor.submit(self.chatCompletionObject.pushFashionCompletionMessages,_userJson)

        response = _openAISubmission.result()
        _dbResponse = _pushToDB.result()

        if _dbResponse != 201:
            raise Exception("Unable to Push User Prompt in DB")

        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            json_string = match.group()
            jsonResponse = json.loads(json_string)
            return jsonResponse
        else:
            raise Exception("NO JSON FOUND IN OPENAI RESPONSE")

    def getProductMatches(self, outfitDescription):
        _OutfitLinkEndPoint = KeyVault.getKeyValue("OUTFIT_LINK_ENDPOINT")
        response = requests.post(_OutfitLinkEndPoint, json=outfitDescription)
        return response.json()
