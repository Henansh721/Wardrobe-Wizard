from OpenAIChatUtil import OpenAIChatUtil
from BingSearchUtil import *
from KeyVault import KeyVault
from WebPageParser import WebPageParser
import re, json
from concurrent import futures
from FashionTrendUpdater import FashionTrendUpdater


class TrendingOutfitUtil:

    def getTrendingOutfits(self, top_results, isSocial):

        promptMessage = KeyVault.getKeyValue(
            "OPENAI_PERSONAL_FASHION_SYSTEM_PROMPT") if isSocial else KeyVault.getKeyValue(
            "OPENAI_PERSONAL_INFLUENCER_SYSTEM_PROMPT")

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

        searchQuery = str(searchQuery).format(searchTerm=_trend_search_term)

        results = BingSearchUtil().getSearchResult(searchQuery)

        urlList = []
        _urlListSize = int(KeyVault.getKeyValue("URL_LIST_SIZE"))

        for result in results[:_urlListSize]:
            urlList.append(result['url'])

        urlList = set(urlList)

        _topResultSize = int(KeyVault.getKeyValue("TOP_RESULT_SIZE"))

        webScrapper = WebPageParser()

        with futures.ThreadPoolExecutor(max_workers=len(urlList)) as executor:

            scrappedResponse = []

            for url in urlList:
                scrappedResponse.append(executor.submit(webScrapper.get_cleaned_text, url))

            for response in futures.as_completed(scrappedResponse):
                if len(top_results) >= _topResultSize:
                    response.cancel()
                else:
                    result = response.result()
                    if result != "":
                        top_results.append(result)

        trendsResponse = self.getTrendingOutfits(top_results, isSocial)

        if isGlobal:
            _socialUpdate = FashionTrendUpdater().updateFashionTrends(trendsResponse, isSocial)

        return trendsResponse
