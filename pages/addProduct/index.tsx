import Image from "next/image";
import { Inter } from "next/font/google";
import { Fragment, useState } from "react";
import Head from "next/head";
import InfoTile from "@/components/InfoTile";
import DropDownTile from "@/components/dropDownTile";
import { ProductDetails } from "@/lib/classModels/product/productDetails";
import ListTag from "@/components/ListTag";
import { useRouter } from "next/router";

export const addProductDetailsHandler = async (
  productDetails: ProductDetails
) => {
  const response = await fetch("/api/addProductDetails", {
    method: "POST",
    body: JSON.stringify({ productDetails }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

export default function AddProduct() {
  const router = useRouter();
  const [productName, setProductName] = useState<string>("");
  const [productGender, setProductGender] = useState<string>("MALE");
  const [productColor, setProductColor] = useState<string>("");
  const [productImageUrl, setProductImageUrl] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productBrandName, setProductBrandName] = useState<string>("");
  const [productCategoryName, setProductCategoryName] = useState<string>("");
  const [productSubcategoryName, setProductSubcategoryName] = useState<string>("");
  const [productTagList, setProductTagList] = useState<string[]>([]);
  const [productPrice, setProductPrice] = useState<number>(0);

  const [categoryList, setCategoryList] = useState<string[]>([
    "TOPWEAR",
    "BOTTOMWEAR",
    "FOOTWEAR",
    "WATCHES",
    "BAGS",
    "WINTERWEAR",
    "ETHNICWEAR",
  ]);
  const [subCategoryMap, setSubcategoryMap] = useState<any>({
    "": [],
    "TOPWEAR": ["TSHIRTS", "FORMAL-SHIRTS", "CASUAL-SHIRTS"],
    "BOTTOMWEAR": ["JEANS", "FORMAL-TROUSERS", "CASUAL-TROUSERS", "TRACK-PANTS-TROUSERS", "SHORTS-TROUSERS", "THREE-FOURTH-TROUSERS"],
    "FOOTWEAR": ["SPORTS-SHOES", "CASUAL-SHOES", "FORMAL-SHOES", "SANDLES-AND-FLOATERS", "FLIP-FLOPS", "LOAFERS", "BOOTS", "RUNNING-SHOES", "SNEAKERS", "FLATS", "HEELS", "WEDGES"],
    "WATCHES": ["SPORTS-WATCHES", "ANALOG-WATCHES", "DIGITAL-WATCHES"],
    "BAGS": ["BAGPACKS", "WALLETS", "SUITCASES", "HAND-BAGS", "SHOULDER-BAGS", "SLING-BAGS", "CLUTHES"],
    "WINTERWEAR": ["SWEATSHIRTS", "JACKETS", "SWEATERS", "BLAZERS"],
    'ETHNICWEAR': ["KURTA", "SHERWANI", "DHOTI", "LUNGI", "SARI", "LEHENGA", "GOWN"],
  });

  const submitHandler = async () => {
    let prd = new ProductDetails();
    prd.product_Name = productName;
    prd.product_Gender = productGender;
    prd.product_Color = productColor;
    prd.product_Image_Url = productImageUrl;
    prd.product_Description = productDescription;
    prd.product_Brand_Name = productBrandName;
    prd.product_Category = productCategoryName;
    prd.product_Subcategory = productSubcategoryName;
    prd.product_Tags_List = productTagList;
    prd.product_Price = productPrice;
    console.log(prd);
    const res = await addProductDetailsHandler(prd);
    if (res.details) {
      setProductName("");
      setProductDescription("");
      setProductImageUrl("");
      setProductGender("");
      setProductBrandName("");
      setProductCategoryName("");
      setProductSubcategoryName("");
      setProductTagList([]);
      setProductPrice(0);
    }
    console.log(res);
  };

  return (
    <Fragment>
      <Head>
        <title>{`Add Product`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h2
          className={`mx-auto w-full text-3xl font-serif font-semibold text-center py-5`}
        >
          Add New Product
        </h2>
        <div className={`relative w-full flex flex-col space-y-2`}>
          <InfoTile
            headerText={"Product name"}
            tileText={productName}
            descriptionText={""}
            placeHolderText={"Enter the name of the product"}
            inputType={"name"}
            setter={setProductName}
          />
          <InfoTile
            headerText={"Product Color"}
            tileText={productColor}
            descriptionText={""}
            placeHolderText={"Enter the color of the product"}
            inputType={"name"}
            setter={setProductColor}
          />
          <InfoTile
            headerText={"Product description"}
            tileText={productDescription}
            descriptionText={""}
            placeHolderText={"Enter the description of the product"}
            inputType={"name"}
            setter={setProductDescription}
          />
          <InfoTile
            headerText={"Product Firebase Image Url"}
            tileText={productImageUrl}
            descriptionText={""}
            placeHolderText={"Enter the firebase Image url of the product"}
            inputType={"name"}
            setter={setProductImageUrl}
          />
          <InfoTile
            headerText={"Product Brand"}
            tileText={productBrandName}
            descriptionText={""}
            placeHolderText={"Enter the brand name of the product"}
            inputType={"name"}
            setter={setProductBrandName}
          />
          <DropDownTile
            header={`Select product for MALE/FEMALE`}
            optionList={["MALE", "FEMALE", "UNIVERSAL"]}
            setter={setProductGender}
          />
          <DropDownTile
            header={`Select product category`}
            optionList={categoryList}
            setter={setProductCategoryName}
          />
          {productCategoryName && (
            <DropDownTile
            header={`Select product sub-category`}
            optionList={subCategoryMap[productCategoryName]}
            setter={setProductSubcategoryName}
          />
          )}
          <InfoTile
            headerText={"Product price"}
            tileText={productPrice}
            descriptionText={""}
            placeHolderText={"Enter the price of the product"}
            inputType={"number"}
            setter={setProductPrice}
          />
          <ListTag
            heading={"Enter the style tags of the product"}
            listSetter={setProductTagList}
            type={"name"}
            placeholder={"Enter the style tag of the product"}
          />
        </div>
        <div className={`relative flex justify-center w-full my-8`}>
          <button
            onClick={submitHandler}
            className={`relative rounded-3xl bg-red-400 py-2 px-8 text-white font-mono`}
          >
            Submit
          </button>
        </div>
      </main>
    </Fragment>
  );
}
