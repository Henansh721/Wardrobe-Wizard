import { auth, db } from "@/lib/firebase";
import {
  FASHION_TRENDS_KEY,
  TRENDING_INFLUENCERS_KEY,
  TRENDS_COLLECTION_NAME,
  USER_COLLECTION_NAME,
  USER_ORDERS_COLLECTION_NAME,
} from "@/lib/helper";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

async function handler(req: any, res: any) {
  const influencersMap = req.body;

  try {
    const docRef = doc(db, TRENDS_COLLECTION_NAME, TRENDING_INFLUENCERS_KEY);
    const val = await getDoc(docRef);
    const map = val.data()?.trending_Influencers_Map;

    const mergedInfluencersMap = Object.assign({}, influencersMap, map);

    const response = await setDoc(docRef, {
      trending_Influencers_Map: mergedInfluencersMap,
    });

    res.status(201).json(mergedInfluencersMap);
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in updating trending influencers",
    });
  }
}

export default handler;
