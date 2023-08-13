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

  try {
    const docRef = doc(db, TRENDS_COLLECTION_NAME, FASHION_TRENDS_KEY);
    const response = await setDoc(docRef, {
      socail_Media_Trends_Map: receivedData,
    });

    res.status(201).json(receivedData);
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in updating global fashion trends",
    });
  }
}

export default handler;
