import openai
from KeyVault import KeyVault


class OpenAIChatUtil:
    def __init__(self, _engine, _messages):
        openai.api_type = "azure"
        openai.api_base = KeyVault.getKeyValue('AZURE_OPENAI_ENDPOINT')
        openai.api_version = "2023-05-15"
        openai.api_key = KeyVault.getKeyValue('AZURE_OPENAI_KEY')

        self.engine = _engine
        self.messages = _messages

    def create_chat_completion(self):
        response = openai.ChatCompletion.create(
            engine=self.engine,
            messages=self.messages
        )
        return response['choices'][0]['message']['content']
