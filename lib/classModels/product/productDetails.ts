export class ProductDetails {
  product_Id: string = "";
  product_Name: string = "";
  product_Description: string = "";
  product_BrandName: string = "";
  product_Category: string = "";
  product_Subcategory: string = "";
  product_Tags_List: any[] = [];
  product_Main_ImgUrl: string = "";
  product_Image_Url_List: string[] = [];
  product_MRP: number = 0;
  product_Current_Price: number = 0;
  product_Size_List: number[] = [];

  constructor() {}
}
