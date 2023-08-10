import { LocationDetails } from "../location/locationDetail";
import { ProductOrderDetails } from "../order/orderDetails";

export class UserDetails {
  userId: string = "";
  userName: string = "";
  userEmailId: string = "";
  userGender: string = "";
  userMobileNumber: number = 0;
  userAddress: LocationDetails = new LocationDetails();
  orderHistoryList: ProductOrderDetails[] = [];

  //////////////////////////// GPT Generated ////////////////////////////
  userBodyType: string = "";
  userStyleTagsList: any[] = [];
  userPurchaseBrandNameMap: any = {};
  userStylePreferenceList: string[] = [];
  
  constructor() {}
}
