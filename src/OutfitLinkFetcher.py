
from BingImageService import BingImageSearchAPI

class OutfitLinkFetcher:

    def __init__(self):
        return

    def getOutfitLink(self, _outfits ):
        outfitLinks = {}    
        for key, value in _outfits.items():
            outfitLinks[key] = BingImageSearchAPI().search_images(value + " Flipkart")
        return outfitLinks