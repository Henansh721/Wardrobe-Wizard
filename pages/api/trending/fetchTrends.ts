import { db } from "@/lib/firebase";
import {
  FASHION_TRENDS_KEY,
  TRENDING_INFLUENCERS_KEY,
  TRENDS_COLLECTION_NAME,
} from "@/lib/helper";

import { doc, getDoc } from "firebase/firestore";

async function handler(req: any, res: any) {
  try {
    const docRef1 = doc(db, TRENDS_COLLECTION_NAME, FASHION_TRENDS_KEY);
    const trendsInfo = await getDoc(docRef1);
    let map1 = trendsInfo.data()?.socail_Media_Trends_Map;

    const docRef2 = doc(db, TRENDS_COLLECTION_NAME, TRENDING_INFLUENCERS_KEY);
    const influencersInfo = await getDoc(docRef2);
    let map2 = influencersInfo.data()?.trending_Influencers_Map;

    res.status(201).json({
      trends: map1,
      influencers: map2,
    });
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in fetching user personal details",
    });
  }
}

export default handler;
