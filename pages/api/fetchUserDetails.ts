import { ProductOrderDetails } from "@/lib/classModels/order/orderDetails";
import { UserDetails } from "@/lib/classModels/user/userDetails";
import { db } from "@/lib/firebase";
import { getProductDetails } from "@/lib/firebase/functionHandler";
import {
  USER_COLLECTION_NAME,
  USER_ORDERS_COLLECTION_NAME,
} from "@/lib/helper";

import { doc, getDoc, getDocs, collection } from "firebase/firestore";

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
    user.user_Style_Colors_Map = userInfo.data()?.user_Style_Colors_Map;
    user.cart_Product_Id_List = userInfo.data()?.cart_Product_Id_List;

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
        product_Color: val.order_Product_Details.product_Color,
        product_Description: val.order_Product_Details.product_Description,
        product_Brand_Name: val.order_Product_Details.product_Brand_Name,
        product_Category: val.order_Product_Details.product_Category,
        product_Subcategory: val.order_Product_Details.product_Subcategory,
        product_Tags_List: val.order_Product_Details.product_Tags_List,
        product_Dimensions: val.product_Dimensions,
      }

      orderList.push(od);
    }

    for (let prd of user.cart_Product_Id_List) {
      let pid = prd.product_Id;
      let pCtg = prd.product_Category;

      const productRef = doc(db, pCtg, pid);
      const pInfo = await getDoc(productRef);

      let od = {
        product_Name: pInfo.data()?.product_Name,
        product_Color: pInfo.data()?.product_Color,
        product_Description: pInfo.data()?.product_Description,
        product_Brand_Name: pInfo.data()?.product_Brand_Name,
        product_Category: pInfo.data()?.product_Category,
        product_Subcategory: pInfo.data()?.product_Subcategory,
        product_Tags_List: pInfo.data()?.product_Tags_List,
        product_Dimensions: pInfo.data()?.product_Dimensions,
      };

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
      user_Style_Colors_Map: user.user_Style_Colors_Map,
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
