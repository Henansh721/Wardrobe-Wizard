import os

class KeyVault():
    @staticmethod
    def getKeyValue(secret_name):
        return os.getenv(secret_name)