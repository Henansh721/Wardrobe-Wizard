import { auth, db } from "@/lib/firebase";
import { getProductDetails } from "@/lib/firebase/functionHandler";

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
