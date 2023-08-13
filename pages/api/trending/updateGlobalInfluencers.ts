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
  getDocs,
  collection,
  updateDoc,
  setDoc,
} from "firebase/firestore";

async function handler(req: any, res: any) {
  const receivedData = req.body;
  //   const { influencersMapping } = req.query;
//   const { influencersMapping } = receivedData;

  const influencersMap = JSON.parse(decodeURIComponent(receivedData));

  try {
    const docRef = doc(db, TRENDS_COLLECTION_NAME, TRENDING_INFLUENCERS_KEY);
    const response = await updateDoc(docRef, {
      trending_Influencers_Map: influencersMap,
    });

    res.status(201).json(response);
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in updating user personal details",
    });
  }
}

export default handler;
