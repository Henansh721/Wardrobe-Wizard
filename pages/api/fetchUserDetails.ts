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
    user.user_Body_Type = userInfo.data()?.user_Body_Type;
    user.user_Body_Shape = userInfo.data()?.user_Body_Shape;
    user.user_Style_Tags_List = userInfo.data()?.user_Style_Tags_List;
    user.user_Purchase_Brand_Name_Map = userInfo.data()?.user_Purchase_Brand_Name_Map;
    user.user_Address = userInfo.data()?.user_Address;

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
      orderInfo.product_Dimensions = order.data().product_Dimensions;
      orderInfo.order_Price = order.data().order_Price;
      orderInfo.order_Date = new Date(order.data().order_Date);
      orderInfo.order_Delivery_Date = new Date(
        order.data().order_Delivery_Date
      );
      orderInfo.order_Location = order.data()?.order_Location;
      orderInfo.order_Product_Details = await getProductDetails(
        order.data().product_Category,
        order.data().product_Id
      );

      list.push(orderInfo);
    }

    user.order_History_List = list;

    let orderList = [];
    for (let val of user.order_History_List) {
      let od = {
        product_Name: val.order_Product_Details.product_Name,
        product_Description: val.order_Product_Details.product_Description,
        product_Brand_Name: val.order_Product_Details.product_Brand_Name,
        product_Category: val.order_Product_Details.product_Category,
        product_Subcategory: val.order_Product_Details.product_Subcategory,
        product_Tags_List: val.order_Product_Details.product_Tags_List,
        product_Dimensions: val.product_Dimensions,
      }

      orderList.push(od);
    }

    let obj = {
      user_Name: user.user_Name,
      user_Email_Id: user.user_Email_Id,
      user_Gender: user.user_Gender,
      user_Age: user.user_Age,
      user_Mobile_Number: user.user_Mobile_Number,
      user_Address: {
        location_State: user.user_Address.location_State,
        location_City: user.user_Address.location_City,
      },
      user_Body_Type: user.user_Body_Type,
      user_Style_Tags_List: user.user_Style_Tags_List,
      user_Purchase_Brand_Name_Map: user.user_Purchase_Brand_Name_Map,
      order_History_List: orderList,
    };

    res.status(201).json(obj);
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in fetching user personal details",
    });
  }
}

export default handler;
