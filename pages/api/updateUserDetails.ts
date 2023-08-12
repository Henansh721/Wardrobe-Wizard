import { ProductOrderDetails } from "@/lib/classModels/order/orderDetails";
import { ProductDetails } from "@/lib/classModels/product/productDetails";
import { UserDetails } from "@/lib/classModels/user/userDetails";
import { auth, db } from "@/lib/firebase";
import {
  USER_COLLECTION_NAME,
  USER_ORDERS_COLLECTION_NAME,
} from "@/lib/helper";

import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";

async function handler(req: any, res: any) {
  const receivedData = req.body;
  const {
    userId,
    user_Body_Type,
    user_Style_Tags_List,
    user_Purchase_Brand_Name_Map,
  } = req.query;

  const bodyType =  JSON.parse(decodeURIComponent(user_Body_Type));
  const styleTagList = JSON.parse(decodeURIComponent(user_Style_Tags_List));
  const purchaseBrandMap = JSON.parse(decodeURIComponent(user_Purchase_Brand_Name_Map));

  try {
    const docRef = doc(db, USER_COLLECTION_NAME, userId);
    const userInfo = await getDoc(docRef);
    const response = await updateDoc(docRef, {
      user_Body_Type: bodyType,
      user_Style_Tags_List: styleTagList,
      user_Purchase_Brand_Name_Map: purchaseBrandMap,
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
