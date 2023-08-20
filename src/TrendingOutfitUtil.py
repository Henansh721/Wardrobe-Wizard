from OpenAIChatUtil import OpenAIChatUtil
from BingSearchUtil import *
from KeyVault import KeyVault
from WebPageParser import WebPageParser
import re, json
from concurrent import futures
from FashionTrendUpdater import FashionTrendUpdater


def mergeTrendingOutfitJson(_results):
    outfitJson = {}
    for _json in _results:
        outfitJson.update(_json)
    return outfitJson



class TrendingOutfitUtil:

    def getTrendingOutfits(self, _url, isSocial):

        result = WebPageParser().get_cleaned_text(_url)

        if result == "":
            return {}

        prompt = KeyVault.getKeyValue("OPENAI_PERSONAL_FASHION_SYSTEM_PROMPT") if isSocial else KeyVault.getKeyValue("OPENAI_PERSONAL_INFLUENCER_SYSTEM_PROMPT")

        chatCompletionObject = [{"role": "system", "content": prompt},
                                {"role": "user", "content": result}]

        response = OpenAIChatUtil(KeyVault.getKeyValue('AZURE_OPENAI_DEPLOYMENT'),
                                  chatCompletionObject).create_chat_completion()

        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            json_string = match.group()
            jsonResponse = json.loads(json_string)
            return jsonResponse
        else:
            print("NO JSON FOUND IN OPENAI RESPONSE -->>", _url)
            return {}

    def getTrendingOutfitJSON(self, _trend_search_term, isSocial):
        top_results = []
        urlList = set()

        _urlListSize = int(KeyVault.getKeyValue("URL_LIST_SIZE"))
        _topResultSize = int(KeyVault.getKeyValue("TOP_RESULT_SIZE"))

        results = BingSearchUtil().getSearchResult(_trend_search_term)

        for result in results[:_urlListSize]:
            urlList.add(result['url'])

        with futures.ThreadPoolExecutor(max_workers=len(urlList)) as executor:

            scrappedResponse = [executor.submit(self.getTrendingOutfits, _url, isSocial) for _url in urlList]

            for response in futures.as_completed(scrappedResponse):
                result = response.result()
                if result != {}:
                    top_results.append(result)
                if len(top_results) >= _topResultSize:
                    break

            trendsResponse = mergeTrendingOutfitJson(top_results)
            # _socialUpdate = FashionTrendUpdater().updateFashionTrends(trendsResponse, isSocial)

            # if _socialUpdate != 201:
            #     raise Exception("Unable to Update " + ("Fashion" if isSocial else "Influencer") + "Trends in DB")

            for remaining_requests in scrappedResponse:
                remaining_requests.cancel()

        return trendsResponse
