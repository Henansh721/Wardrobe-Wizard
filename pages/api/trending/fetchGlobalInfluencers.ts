import { ProductOrderDetails } from "@/lib/classModels/order/orderDetails";
import { UserDetails } from "@/lib/classModels/user/userDetails";
import { db } from "@/lib/firebase";
import { getProductDetails } from "@/lib/firebase/functionHandler";
import {
  FASHION_TRENDS_KEY,
  TRENDING_INFLUENCERS_KEY,
  TRENDS_COLLECTION_NAME,
  USER_COLLECTION_NAME,
  USER_ORDERS_COLLECTION_NAME,
} from "@/lib/helper";

import { doc, getDoc, getDocs, collection } from "firebase/firestore";

async function handler(req: any, res: any) {
  const receivedData = req.body;

  try {
    const docRef = doc(db, TRENDS_COLLECTION_NAME, TRENDING_INFLUENCERS_KEY);
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
