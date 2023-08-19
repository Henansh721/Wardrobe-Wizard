import json

from KeyVault import KeyVault
import requests


class FashionTrends:
    def __init__(self, _prompt):
        self.trendPrompt = _prompt
    
    def getGlobalFashionTrends(self):
        response = requests.get(KeyVault.getKeyValue("GET_GLOBAL_FASHION_ENDPOINT"))
        return json.loads(response.content)
