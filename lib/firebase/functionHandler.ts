import { ProductOrderDetails } from "@/lib/classModels/order/orderDetails";
import { ProductDetails } from "@/lib/classModels/product/productDetails";
import { UserDetails } from "@/lib/classModels/user/userDetails";
import { auth, db } from "@/lib/firebase";
import {
  USER_COLLECTION_NAME,
  USER_ORDERS_COLLECTION_NAME,
} from "@/lib/helper";

import { doc, getDoc, getDocs, collection } from "firebase/firestore";

export const getProductDetails = async (
  collectionName: string,
  productId: string
): Promise<ProductDetails> => {
  const docRef = doc(db, collectionName, productId);
  const productInfo = await getDoc(docRef);

  let product = new ProductDetails();
  product.product_Id = productInfo.data()?.product_Id;
  product.product_Name = productInfo.data()?.product_Name;
  product.product_Color = productInfo.data()?.product_Color;
  product.product_Description = productInfo.data()?.product_Description;
  product.product_Brand_Name = productInfo.data()?.product_Brand_Name;
  product.product_Category = productInfo.data()?.product_Category;
  product.product_Subcategory = productInfo.data()?.product_Subcategory;
  product.product_Gender = productInfo.data()?.product_Gender;
  product.product_Tags_List = productInfo.data()?.product_Tags_List;
  product.product_Image_Url = productInfo.data()?.product_Image_Url;
  product.product_Price = productInfo.data()?.product_Price;
  product.product_Size_List = productInfo.data()?.product_Size_List;

  return product;
};
