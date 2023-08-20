import { db } from "@/lib/firebase";
import {
  FASHION_TRENDS_KEY,
  TRENDING_INFLUENCERS_KEY,
  TRENDS_COLLECTION_NAME,
} from "@/lib/helper";

import { doc, getDoc, setDoc } from "firebase/firestore";

async function handler(req: any, res: any) {
  const influencersMap = req.body;

  try {
    const docRef2 = doc(db, TRENDS_COLLECTION_NAME, TRENDING_INFLUENCERS_KEY);
    const influencersInfo = await getDoc(docRef2);
    let map = influencersInfo.data()?.trending_Influencers_Map;

    for (const [key, value] of influencersMap) map[key] = value;

    const docRef = doc(db, TRENDS_COLLECTION_NAME, TRENDING_INFLUENCERS_KEY);
    const response = await setDoc(docRef, {
      trending_Influencers_Map: map,
    });

    res.status(201).json(map);
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in fetching user personal details",
    });
  }
}

export default handler;
