from flask import Flask, request, jsonify
from TrendingOutfitUtil import *
from dotenv import load_dotenv
from concurrent import futures

load_dotenv()
app = Flask(__name__)


@app.route('/get_fashion_trends', methods=['POST'])
def post_personalised_endpoint():
    try:
        data = request.get_json()

        isGlobal = (data.get('isGlobal') == "True")

        outfits_assistant = TrendingOutfitUtil()

        with futures.ThreadPoolExecutor() as executor:
            trendSubmission = executor.submit(outfits_assistant.getTrendingOutfitJSON, data.get('trends'), True,
                                              isGlobal)
            influencersSubmission = executor.submit(outfits_assistant.getTrendingOutfitJSON, data.get('influencers'),
                                                    False, isGlobal)

        trends_json = trendSubmission.result()
        influencers_json = influencersSubmission.result()

        return {"trends": trends_json, "influencers": influencers_json}, 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
