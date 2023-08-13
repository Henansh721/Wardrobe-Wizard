import { auth, db } from "@/lib/firebase";
import {
  FASHION_TRENDS_KEY,
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
  const { userId, trendsMapping } = req.query;

  const trendsMap = JSON.parse(decodeURIComponent(trendsMapping));

  try {
    const docRef = doc(db, TRENDS_COLLECTION_NAME, FASHION_TRENDS_KEY);
    const response = await updateDoc(docRef, {
      socail_Media_Trends_Map: trendsMap,
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
