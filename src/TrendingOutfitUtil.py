from OpenAIChatUtil import OpenAIChatUtil
from BingSearchUtil import *
from KeyVault import KeyVault
from WebPageParser import WebPageParser
import re, json
from concurrent import futures
from FashionTrendUpdater import FashionTrendUpdater


class TrendingOutfitUtil:

    def getTrendingOutfits(self, top_results, isSocial):

        _type = "Fashion" if isSocial else "Fashion Influencer"
        _contain = "Outfit" if isSocial else "Influencer's Outfit"

        promptMessage = KeyVault.getKeyValue("OPENAI_PERSONAL_FASHION_SYSTEM_PROMPT").format(type=_type,
                                                                                             contain=_contain)

        chatCompletionObject = [{"role": "system", "content": promptMessage},
                                {"role": "user", "content": json.dumps(top_results)}]

        response = OpenAIChatUtil(KeyVault.getKeyValue('AZURE_OPENAI_DEPLOYMENT'),
                                  chatCompletionObject).create_chat_completion()

        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            json_string = match.group()
            jsonResponse = json.loads(json_string)
            return jsonResponse
        else:
            raise Exception("NO JSON FOUND IN OPENAI RESPONSE")

    def getTrendingOutfitJSON(self, _trend_search_term, isSocial, isGlobal):
        top_results = []

        searchQuery = KeyVault.getKeyValue("PERSONAL_FASHION_TRENDS") if isSocial else KeyVault.getKeyValue(
            "PERSONAL_INFLUENCER_TRENDS")

        searchQuery = str(searchQuery).format(searchTearm=_trend_search_term)

        results = BingSearchUtil().getSearchResult(searchQuery)

        urlList = []

        for result in results[:10]:
            urlList.append(result['url'])

        urlList = set(urlList)

        webScrapper = WebPageParser()

        with futures.ThreadPoolExecutor(max_workers=len(urlList)) as executor:

            scrappedResponse = []

            for url in urlList:
                scrappedResponse.append(executor.submit(webScrapper.get_cleaned_text, url))

            for response in futures.as_completed(scrappedResponse):
                result = response.result()
                if result != "":
                    top_results.append(result)
                if len(top_results) >= 4:
                    break

            for remaining_requests in scrappedResponse:
                if not remaining_requests.done():
                    remaining_requests.cancel()

        trendsResponse = self.getTrendingOutfits(top_results, isSocial)

        if isGlobal:
            _socialUpdate = FashionTrendUpdater().updateFashionTrends(trendsResponse, isSocial)

        return trendsResponse
