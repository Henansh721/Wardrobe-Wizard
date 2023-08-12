import { ProductOrderDetails } from "@/lib/classModels/order/orderDetails";
import { ProductDetails } from "@/lib/classModels/product/productDetails";
import { UserDetails } from "@/lib/classModels/user/userDetails";
import { auth, db } from "@/lib/firebase";
import { getProductDetails } from "@/lib/firebase/functionHandler";
import {
  USER_COLLECTION_NAME,
  USER_ORDERS_COLLECTION_NAME,
} from "@/lib/helper";

import { doc, getDoc, getDocs, collection } from "firebase/firestore";

async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { productCategory, productId } = req.query;

  try {
    const productInfo = await getProductDetails(productCategory, productId);

    res.status(201).json(productInfo);
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in fetching product details",
    });
  }
}

export default handler;
