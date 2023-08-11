export class ProductDetails {
  product_Id: string = "";
  product_Name: string = "";
  product_Description: string = "";
  product_Brand_Name: string = "";
  product_Category: string = "";
  product_Subcategory: string = "";
  product_Gender: string = "MALE";
  product_Tags_List: any[] = [];
  product_Image_Url: string = "";
  product_Price: number = 100;
  product_Size_List: number[] = [0, 100];

  constructor() {}
}
