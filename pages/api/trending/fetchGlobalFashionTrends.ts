import { db } from "@/lib/firebase";
import {
  FASHION_TRENDS_KEY,
  TRENDS_COLLECTION_NAME,
} from "@/lib/helper";

import { doc, getDoc } from "firebase/firestore";

async function handler(req: any, res: any) {
  //   const receivedData = req.body;
  //   const { userId } = req.query;

  try {
    const docRef = doc(db, TRENDS_COLLECTION_NAME, FASHION_TRENDS_KEY);
    const trendsInfo = await getDoc(docRef);
    let map = trendsInfo.data()?.trending_Influencers_Map;
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
