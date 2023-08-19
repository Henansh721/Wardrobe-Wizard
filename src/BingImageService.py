import requests
from KeyVault import KeyVault

class BingImageSearchAPI:
    def __init__(self):
        self.bingSearchURL = KeyVault.getKeyValue("BING_SEARCH_URL")
        self.headers = {"Ocp-Apim-Subscription-Key": KeyVault.getKeyValue('BING_SUBSCRIPTION_KEY')}

    def search_images(self, _query):
        params = {"q": _query,"count": 1,"imageType": "Photo"}

        response = requests.get(self.bingSearchURL, headers=self.headers, params=params)
        data = response.json()

        try:
            images = data["images"]["value"]
            if images:
                image_info = images[0]
                return image_info.get("thumbnailUrl")
        except Exception as e:
            return str(e)