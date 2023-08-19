import requests

class BingImageSearchAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.bing.microsoft.com/v7.0/images/search"

    def search_images(self, query):
        headers = {
            "Ocp-Apim-Subscription-Key": self.api_key,
        }

        params = {
            "q": query,
            "count": 1,  # You can adjust the number of images to retrieve
            "imageType": "Photo",
        }

        response = requests.get(self.base_url, headers=headers, params=params)
        data = response.json()
        if "value" in data:
            images = data["value"]
            if images:
                image_info = images[0]
                return image_info.get("thumbnailUrl")

        return None
