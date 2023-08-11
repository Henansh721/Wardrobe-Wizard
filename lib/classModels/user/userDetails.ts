import { LocationDetails } from "../location/locationDetail";
import { ProductOrderDetails } from "../order/orderDetails";

export class UserDetails {
  user_Id: string = "";
  user_Name: string = "";
  user_Email_Id: string = "";
  user_Gender: string = "";
  user_Mobile_Number: number = 0;
  user_Age: number = 0;
  user_Address: LocationDetails = new LocationDetails();
  order_History_List: ProductOrderDetails[] = [];

  //////////////////////////// GPT Generated ////////////////////////////
  user_Body_Type: string = "";
  user_Style_Tags_List: any[] = [];
  user_Purchase_Brand_Name_Map: any = {};
  user_Style_Preferences_List: string[] = [];
  
  constructor() {}
}
