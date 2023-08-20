import json

import requests
from KeyVault import KeyVault


class FashionTrendUpdater:
    def updateFashionTrends(self, data, isSocial):
        _endPoint = KeyVault.getKeyValue("PUSH_FASHION_TRENDS_ENDPOINT") if isSocial else KeyVault.getKeyValue("PUSH_INFLUENCER_TRENDS_ENDPOINT")
        print("Fashion" if isSocial else "Influencer --->>>>", _endPoint, "  ;;  " + json.dumps(data))
        response = requests.post(_endPoint, json=data)
        return response.status_code



