import { db } from "@/lib/firebase";
import {
  FASHION_TRENDS_KEY,
  TRENDING_INFLUENCERS_KEY,
  TRENDS_COLLECTION_NAME,
} from "@/lib/helper";

import { doc, getDoc, setDoc } from "firebase/firestore";

async function handler(req: any, res: any) {
  const fashionMap = req.body;
  try {
    const docRef1 = doc(db, TRENDS_COLLECTION_NAME, FASHION_TRENDS_KEY);
    const trendsInfo = await getDoc(docRef1);
    let map = trendsInfo.data()?.socail_Media_Trends_Map;

    const mergedFashionMap = Object.assign({}, fashionMap, map);

    const docRef = doc(db, TRENDS_COLLECTION_NAME, FASHION_TRENDS_KEY);
    const response = await setDoc(docRef, {
      socail_Media_Trends_Map: mergedFashionMap,
    });

    res.status(201).json(mergedFashionMap);
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in fetching user personal details",
    });
  }
}

export default handler;
