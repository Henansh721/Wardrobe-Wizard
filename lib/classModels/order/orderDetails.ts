import { LocationDetails } from "../location/locationDetail";
import { ProductDetails } from "../product/productDetails";

export class ProductOrderDetails {
  order_Id: string = "";
  productId: string = "";
  order_Product_Details: ProductDetails = new ProductDetails();
  order_Quantity: number = 1;
  order_Size: number = 0;
  order_Price: number = 0;
  order_Location: LocationDetails = new LocationDetails();
  order_Date: Date = new Date();
  order_Delivery_Date: Date = new Date();

  constructor() {}
}
