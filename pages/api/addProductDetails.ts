import { auth, db } from "@/lib/firebase";

import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const shortid = require("shortid");

async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { productDetails } = receivedData;
  //   console.log(productDetails);

  try {
    let uId = shortid.generate();
    const docRef = collection(db, productDetails.product_Category);
    console.log(uId);

    const response = await addDoc(docRef, {
      product_Id: "",
      product_Name: productDetails.product_Name,
      product_Gender: productDetails.product_Gender,
      product_Description: productDetails.product_Description,
      product_Brand_Name: productDetails.product_Brand_Name,
      product_Category: productDetails.product_Category,
      product_Subcategory: productDetails.product_Subcategory,
      product_Tags_List: productDetails.product_Tags_List,
      product_Image_Url: productDetails.product_Image_Url,
      product_Price: productDetails.product_Price,
      product_Size_List: productDetails.product_Size_List,
    });

    await updateDoc(doc(db, productDetails.product_Category, response.id), {
      product_Id: response.id,
    });

    res.status(201).json({
      details: response,
      error: null,
      message: "Successfully added product details",
    });
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in adding product details",
    });
  }
}

export default handler;
