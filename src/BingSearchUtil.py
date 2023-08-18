import requests
from KeyVault import KeyVault


class BingSearchUtil:
    def __init__(self):
        self.bingSearchURL = KeyVault.getKeyValue("BING_SEARCH_URL")
        self.headers = {"Ocp-Apim-Subscription-Key": KeyVault.getKeyValue('BING_SUBSCRIPTION_KEY')}

    def getSearchResult(self, search_term):
        params = {"q": search_term, "textDecorations": True, "textFormat": "HTML"}
        response = requests.get(self.bingSearchURL, headers=self.headers, params=params)
        response.raise_for_status()
        search_results = response.json()
        return search_results['webPages']['value']
