export class ProductDetails {
  productId: string = "";
  productName: string = "";
  productDescription: string = "";
  productBrandName: string = "";
  productCategory: string = "";
  productSubcategory: string = "";
  productTagsList: any[] = [];
  productMainImgUrl: string = "";
  productImagUrlList: string[] = [];
  productMRP: number = 0;
  productCurrentPrice: number = 0;
  productSizeList: number[] = [];

  constructor() {}
}
