from flask import Flask, request, jsonify
from TrendingOutfitUtil import *
from dotenv import load_dotenv
from concurrent import futures
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/get_fashion_trends', methods=['POST'])
def post_personalised_endpoint():
    try:
        data = request.get_json()

        outfits_assistant = TrendingOutfitUtil()

        with futures.ThreadPoolExecutor() as executor:
            trendSubmission = executor.submit(outfits_assistant.getTrendingOutfitJSON, data.get('fashion'), True)
            influencersSubmission = executor.submit(outfits_assistant.getTrendingOutfitJSON, data.get('influencer'),False)

        trends_json = trendSubmission.result()
        influencers_json = influencersSubmission.result()

        # trends_json = outfits_assistant.getTrendingOutfitJSON(data.get('influencer'), True)
        # influencers_json = trends_json

        return {"trends": trends_json, "influencers": influencers_json}, 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0')
