import requests
from KeyVault import KeyVault


class FashionTrendUpdater:
    def __init__(self):
        self.fashionTrendEndpoint = KeyVault.getKeyValue("PUSH_FASHION_TRENDS_ENDPOINT")
        self.influencersTrendEndpoint = KeyVault.getKeyValue("PUSH_INFLUENCER_TRENDS_ENDPOINT")

    def updateFashionTrends(self, data, isSocial):
        _endPoint = self.fashionTrendEndpoint if isSocial else self.influencersTrendEndpoint
        response = requests.post(_endPoint, json=data)
        return response.status_code



