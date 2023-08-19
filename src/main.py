from flask import Flask, request, jsonify
from TrendingOutfitUtil import *
from dotenv import load_dotenv
from concurrent import futures
from ChatClassifier import ChatClassifier
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/get_fashion_trends', methods=['POST'])
def post_personalised_endpoint():
    try:
        data = request.get_json()

        isGlobal = (data.get('isGlobal') == "True")

        _chatClassifierResponse = ChatClassifier.getClassifierResponse(data.get("prompt"))

        if not _chatClassifierResponse["isRelated"]:
            return {"status": _chatClassifierResponse["isRelated"],
                    "SOCIAL_TRENDS": {}, "INFLUENCER_TRENDS": {}}, 200

        outfits_assistant = TrendingOutfitUtil()

        with futures.ThreadPoolExecutor() as executor:
            trendSubmission = executor.submit(outfits_assistant.getTrendingOutfitJSON,
                                              _chatClassifierResponse["searchTerm"], True,
                                              isGlobal)
            influencersSubmission = executor.submit(outfits_assistant.getTrendingOutfitJSON,
                                                    _chatClassifierResponse["searchTerm"],
                                                    False, isGlobal)

        trends_json = trendSubmission.result()
        influencers_json = influencersSubmission.result()

        return {"status": _chatClassifierResponse["isRelated"],
                "SOCIAL_TRENDS": trends_json, "INFLUENCER_TRENDS": influencers_json}, 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0')
