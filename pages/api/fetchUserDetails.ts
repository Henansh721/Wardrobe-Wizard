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

async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { userId } = req.query;

  try {
    const docRef = doc(db, USER_COLLECTION_NAME, userId);
    const userInfo = await getDoc(docRef);

    let user = new UserDetails();
    user.user_Id = userId;
    user.user_Name = userInfo.data()?.user_Name;
    user.user_Email_Id = userInfo.data()?.user_Email_Id;
    user.user_Gender = userInfo.data()?.user_Gender;
    user.user_Mobile_Number = userInfo.data()?.user_Mobile_Number;
    user.user_Age = userInfo.data()?.user_Age;

    user.user_Address.location_Id =
      userInfo.data()?.user_Address["location_Id"];
    user.user_Address.location_Name =
      userInfo.data()?.user_Address["location_Name"];
    user.user_Address.location_Address =
      userInfo.data()?.user_Address["location_Address"];
    user.user_Address.location_Country =
      userInfo.data()?.user_Address["location_Country"];
    user.user_Address.location_State =
      userInfo.data()?.user_Address["location_State"];
    user.user_Address.location_City =
      userInfo.data()?.user_Address["location_City"];
    user.user_Address.location_Pincode =
      userInfo.data()?.user_Address["location_Pincode"];
    user.user_Address.location_Landmark =
      userInfo.data()?.user_Address["location_Landmark"];

    const orderHistoryCollectionRef = collection(
      db,
      USER_COLLECTION_NAME,
      userId,
      USER_ORDERS_COLLECTION_NAME
    );
    const orderHistoryQuerySnapshot = await getDocs(orderHistoryCollectionRef);

    let list: ProductOrderDetails[] = [];
    // List of all available hotel Amenities
    for (let order of orderHistoryQuerySnapshot.docs) {
      let orderInfo = new ProductOrderDetails();
      orderInfo.order_Id = order.data().order_Id;
      orderInfo.product_Id = order.data().product_Id;
      orderInfo.product_Category = order.data().product_Category;
      orderInfo.order_Quantity = order.data().order_Quantity;
      orderInfo.order_Size = order.data().order_Size;
      orderInfo.order_Price = order.data().order_Price;
      orderInfo.order_Date = new Date(order.data().order_Date);
      orderInfo.order_Delivery_Date = new Date(order.data().order_Delivery_Date);
      orderInfo.order_Product_Details = await getProductDetails(
        order.data().product_Category,
        order.data().product_Id
      );

      orderInfo.order_Location.location_Id = order.data()?.order_Location["location_Id"];
      orderInfo.order_Location.location_Name = order.data()?.order_Location["location_Name"];
      orderInfo.order_Location.location_Address = order.data()?.order_Location["location_Address"];
      orderInfo.order_Location.location_Country = order.data()?.order_Location["location_Country"];
      orderInfo.order_Location.location_State = order.data()?.order_Location["location_State"];
      orderInfo.order_Location.location_City = order.data()?.order_Location["location_City"];
      orderInfo.order_Location.location_Pincode = order.data()?.order_Location["location_Pincode"];
      orderInfo.order_Location.location_Landmark = order.data()?.order_Location["location_Landmark"];

      list.push(orderInfo);
    }

    user.order_History_List = list;

    res.status(201).json(user);
  } catch (error) {
    res.status(422).json({
        details: null,
        error: error,
        message: "Unsuccessful in fetching user personal details",
      });
  }
}

export default handler;
