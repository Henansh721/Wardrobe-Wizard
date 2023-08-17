import json

from KeyVault import KeyVault
import requests

GLOBAL_FASHION_ENDPOINT = KeyVault.getKeyValue("GET_GLOBAL_FASHION_ENDPOINT")
PERSONAL_FASHION_ENDPOINT = KeyVault.getKeyValue("GET_PERSONAL_FASHION_ENDPOINT")

class FashionTrends:
    def __init__(self, _prompt):
        self.trendPrompt = _prompt
    
    def getGlobalFashionTrends(self):
        response = requests.get(GLOBAL_FASHION_ENDPOINT)
        return json.loads(response.content)

    def getPersonalFashionTrends(self):
        # response = requests.get(PERSONAL_FASHION_ENDPOINT+self.trendPrompt)
        # return json.loads(response.content)
        return json.dumps({"SOCIAL_TRENDS":"","INFLUENCER_TRENDS":""})