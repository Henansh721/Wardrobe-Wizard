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
  user_Body_Type: any = {
    user_Shape: "",
    user_Proportions: "",
    user_Compositions: "",
    user_Physique: "",
  };
  user_Body_Shape: any = {
    user_upper_Dimension: 0,
    user_middle_Dimension: 0,
    user_lower_Dimension: 0,
    measure_scale: "",
  };
  user_Style_Tags_List: string[] = [];
  user_Style_Colors_List: string[] = [];
  user_Prompts_List: any[] = [];
  user_Prompts_Old_List: any[] = [];
  user_Purchase_Brand_Name_Map: any = {};
  user_Style_Colors_Map: any = {};

  constructor() {}
}
