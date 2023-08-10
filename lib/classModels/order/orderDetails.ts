import { LocationDetails } from "../location/locationDetail";
import { ProductDetails } from "../product/productDetails";

export class ProductOrderDetails {
  orderId: string = "";
  productId: string = "";
  orderProductDetails: ProductDetails = new ProductDetails();
  orderQuantity: number = 1;
  orderSize: number = 0;
  orderPrice: number = 0;
  orderLocation: LocationDetails = new LocationDetails();
  orderDate: Date = new Date();
  orderDeliveryDate: Date = new Date();

  constructor() {}
}
