import { LocationDetails } from "../location/locationDetail";
import { ProductDetails } from "../product/productDetails";

export class ProductOrderDetails {
  order_Id: string = "";
  product_Id: string = "";
  product_Category: string = "";
  order_Quantity: number = 1;
  product_Dimensions: any = {
    bust: 0,
    waist: 0,
    chest: 0,
  };
  order_Price: number = 0;
  order_Date: Date = new Date();
  order_Delivery_Date: Date = new Date();
  order_Location: LocationDetails = new LocationDetails();
  order_Product_Details: ProductDetails = new ProductDetails();

  constructor() {}
}
