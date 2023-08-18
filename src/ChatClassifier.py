from OpenAIChatUtil import OpenAIChatUtil
from KeyVault import KeyVault
import re, json


class ChatClassifier:

    @staticmethod
    def getClassifierResponse(_userPrompt):
        promptMessage = KeyVault.getKeyValue("OPENAI_CLASSIFIER_SYSTEM_PROMPT")

        chatCompletionObject = [{"role": "system", "content": promptMessage},
                                {"role": "user", "content": _userPrompt}]

        response = OpenAIChatUtil(KeyVault.getKeyValue('AZURE_OPENAI_DEPLOYMENT'),
                                  chatCompletionObject).create_chat_completion()

        match = re.search(r'\{.*\}', response, re.DOTALL)
        if match:
            json_string = match.group()
            jsonResponse = json.loads(json_string)
            return jsonResponse
        else:
            raise Exception("NO JSON FOUND IN OPENAI RESPONSE")
