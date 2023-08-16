import os
import json
import openai
from KeyVault import KeyVault

class OpenAIUtil():

    def __init__(self):
        openai.api_type = "azure"
        openai.api_base = KeyVault.getKeyValue("AZURE_OPENAI_ENDPOINT")
        openai.api_version = "2023-05-15"
        openai.api_key = KeyVault.getKeyValue("AZURE_OPENAI_KEY")


    def CreateChatCompletion(self, chatCompletionObject, temperature = 0.5, maxTokens = 1000):
        response = openai.ChatCompletion.create(
        engine = KeyVault.getKeyValue("AZURE_OPENAI_DEPLOYMENT"),
        messages = chatCompletionObject,
        temperature = temperature,
        max_tokens = maxTokens
        )

        return response['choices'][0]['message']['content']
