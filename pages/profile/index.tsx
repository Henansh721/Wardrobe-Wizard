import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import ChatBox from "@/components/chat/chatBox";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProductOrderDetails } from "@/lib/classModels/order/orderDetails";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { USER_COLLECTION_NAME } from "@/lib/helper";
import { db } from "@/lib/firebase";
import { UserDetails } from "@/lib/classModels/user/userDetails";
import { getUserDetails } from "@/lib/firebase/functionHandler";
import { ProductDetails } from "@/lib/classModels/product/productDetails";

export default function Profile() {
  const router = useRouter();
  const [userDetail, setUserDetails] = useState<UserDetails>(new UserDetails());
  let sectionList = ["personal-info", "my-orders", "my-cart", "gpt-details"];
  const [profileSection, setProfileSection] = useState<string>(sectionList[0]);
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const [displayImgUrl, setDisplayImgUrl] = useState<string>("");
  const [flipkartUrl, setFlipkartUrl] = useState<string>("");
  const [itemSize, setItemSize] = useState<number[]>([
    10, 20, 30, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  ]);
  const [orderList, setOrderList] = useState<ProductOrderDetails[]>([]);
  const [cartList, setCartList] = useState<ProductDetails[]>([]);

  useEffect(() => {
    const fetchUserDetails = onSnapshot(
      doc(db, USER_COLLECTION_NAME, "CRrie9tuvow0lmrMDbO0"),
      async (doc) => {
        let user = await getUserDetails(doc);
        console.log(user);
        setUserDetails(user);
        setOrderList(user.order_History_List);
        setCartList(user.cart_Product_List);
      }
    );

    return () => {
      fetchUserDetails();
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{`User Profile`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`w-screen h-screen flex flex-col`}>
        <div
          className={`relative flex w-full justify-evenly bg-blue-700 py-2 px-4`}
        >
          <div className={`relative flex space-x-2 w-[50%]`}>
            <Image
              alt="img"
              src={"/fk-plus.png"}
              layout="fixed"
              objectFit="cover"
              width={120}
              height={60}
            />
            <input
              className={`border border-gray-400 text-sm font-sans px-3 py-2 w-full`}
              type={"text"}
              name="name"
              placeholder={`Search your products, brands and more`}
              value={""}
              onChange={(val) => {}}
            />
          </div>
          <div
            className={`relative flex space-x-14 my-auto justify-center w-fit`}
          >
            <div
              className={`relative w-fit flex justify-center text-white font-semibold font-sans text-lg`}
            >
              {userDetail.user_Name.split(" ")[0]}
            </div>
            <div
              className={`relative w-fit flex justify-center text-white font-semibold font-sans text-lg`}
            >
              {`Become a Seller`}
            </div>
            <div
              className={`relative w-fit flex justify-center text-white font-semibold font-sans text-lg`}
            >
              {`More`}
            </div>
            <div
              className={`relative w-fit flex justify-center text-white font-semibold font-sans text-lg`}
            >
              {`Cart`}
            </div>
          </div>
        </div>
        <div
          className={`relative flex w-full space-x-10 justify-center bg-white py-2 px-2`}
        >
          <h4
            className={`relative font-sans font-semibold text-sm`}
          >{`Electronics`}</h4>
          <h4
            className={`relative font-sans font-semibold text-sm`}
          >{`TVs & Appliances`}</h4>
          <h4
            className={`relative font-sans font-semibold text-sm`}
          >{`Men`}</h4>
          <h4
            className={`relative font-sans font-semibold text-sm`}
          >{`Women`}</h4>
          <h4
            className={`relative font-sans font-semibold text-sm`}
          >{`Baby & Kids`}</h4>
          <h4
            className={`relative font-sans font-semibold text-sm`}
          >{`Home & Furniture`}</h4>
          <h4
            className={`relative font-sans font-semibold text-sm`}
          >{`Sports Books & More`}</h4>
          <h4
            className={`relative font-sans font-semibold text-sm`}
          >{`Flights`}</h4>
          <h4
            className={`relative font-sans font-semibold text-sm`}
          >{`Offer Zone`}</h4>
          <h4
            className={`relative font-sans font-semibold text-sm`}
          >{`Grocery`}</h4>
        </div>

        <div className={`relative w-full h-[87.5%] flex bg-gray-200`}>
          <div
            className={`relative flex flex-row w-full h-full space-x-4 p-3 mx-auto justify-center`}
          >
            {displayImgUrl !== "" && (
              <div
                className={`absolute w-full h-full flex flex-row space-x-2 p-1 z-10 bg-slate-200`}
              >
                <div className={`relative flex flex-col w-[40%] h-full`}>
                  <div
                    className={`realtive w-full h-full mx-auto top-0 rounded-t-lg bg-white`}
                  >
                    <Image
                      alt="img"
                      className={`rounded-t-lg`}
                      src={displayImgUrl}
                      layout="fill"
                      objectFit="scale-down"
                    />
                  </div>
                  <div
                    className={`relative flex space-x-2 w-full rounded-b-lg p-2 bg-white`}
                  >
                    <Link
                      href={flipkartUrl}
                      className={`relative w-full`}
                      target="_blank"
                    >
                      <div
                        className={`relative w-full bg-yellow-400 text-white text-center py-4 font-semibold cursor-pointer`}
                      >
                        ADD TO CART
                      </div>
                    </Link>
                    <Link
                      href={flipkartUrl}
                      className={`relative w-full`}
                      target="_blank"
                    >
                      <div
                        className={`relative w-full bg-green-400 text-white text-center py-4 font-semibold cursor-pointer`}
                      >
                        BUY NOW
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className={`relative flex flex-col w-[60%] space-y-1 overflow-y-scroll bg-white rounded-lg px-3 py-1`}
                >
                  <div
                    onClick={() => {
                      setDisplayImgUrl("");
                      setFlipkartUrl("");
                    }}
                    className={`absolute h-7 w-7 top-2 right-2 p-1 rounded-full z-20`}
                  >
                    <Image
                      alt="img"
                      className={`rounded-full cursor-pointer`}
                      src={`/cross.png`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h1
                    className={`relative w-full text-gray-500 font-serif text-xl`}
                  >{`Brand name`}</h1>
                  <p
                    className={`relative w-full text-black font-mono text-md font-medium`}
                  >{`Title of the item`}</p>
                  <h1
                    className={`relative w-full text-black text-2xl font-semibold`}
                  >{`Price: ₹. XXXX`}</h1>
                  <p
                    className={`relative w-full text-gray-600 font-mono text-sm font-medium`}
                  >{`Size`}</p>
                  <div
                    className={`relative flex w-full px-2 py-1 rounded-md space-x-2 overflow-x-scroll bg-slate-200`}
                  >
                    {itemSize.map((sz: number, index: number) => (
                      <div
                        key={index}
                        className={`relative flex justify-center items-center align-middle p-1 h-10 w-10 rounded-full bg-blue-200 hover:bg-blue-400 cursor-pointer font-semibold`}
                      >
                        {sz}
                      </div>
                    ))}
                  </div>
                  <h3
                    className={`relative w-full text-gray-500 font-serif text-xl`}
                  >{`Available Offers`}</h3>
                  <p className={`p-1`}>Offer-1</p>
                  <p className={`p-1`}>Offer-2</p>
                  <p className={`p-1`}>Offer-3</p>
                  <p className={`p-1`}>Offer-4</p>
                </div>
              </div>
            )}
            <div
              className={`relative flex flex-col w-[15%] md:w-[20%] space-y-4 bg-gray-200`}
            >
              <div
                onClick={() => {
                  setProfileSection(sectionList[0]);
                }}
                className={`relative flex w-full px-2 py-4 space-x-4 border-[1px] border-gray-200 text-gray-500 font-semibold text-lg cursor-pointer ${
                  profileSection === sectionList[0] ? "bg-blue-300" : "bg-white"
                }`}
              >
                <div className={`relative min-w-[30%] my-auto`}>
                  <Image
                    alt="img"
                    className={`relative rounded-full`}
                    src={"/user-icon.png"}
                    layout="fixed"
                    objectFit="cover"
                    width={70}
                    height={70}
                  />
                </div>
                <div className={`relative flex flex-col h-full justify-evenly`}>
                  <p className={`relative w-full text-xs`}>Hello,</p>
                  <p
                    className={`relative w-full font-semibold text-md text-black`}
                  >
                    {userDetail.user_Name}
                  </p>
                </div>
              </div>
              <div className={`relative w-full flex flex-col`}>
                <div
                  onClick={() => {
                    setProfileSection(sectionList[1]);
                  }}
                  className={`relative flex justify-center w-full px-2 py-4 border-[0.5px] border-gray-200 text-gray-500 font-semibold text-lg cursor-pointer ${
                    profileSection === sectionList[1]
                      ? "bg-blue-300"
                      : "bg-white"
                  }`}
                >
                  My Orders
                </div>
                <div
                  onClick={() => {
                    setProfileSection(sectionList[2]);
                  }}
                  className={`relative flex justify-center w-full px-2 py-4 border-[0.5px] border-gray-200 text-gray-500 font-semibold text-lg cursor-pointer ${
                    profileSection === sectionList[2]
                      ? "bg-blue-300"
                      : "bg-white"
                  }`}
                >
                  My Cart
                </div>
                <div
                  onClick={() => {
                    setProfileSection(sectionList[3]);
                  }}
                  className={`relative flex justify-center w-full px-2 py-4 border-[0.5px] border-gray-200 text-gray-500 font-semibold text-lg cursor-pointer ${
                    profileSection === sectionList[3]
                      ? "bg-blue-300"
                      : "bg-white"
                  }`}
                >
                  GPT Details
                </div>
              </div>
              <div
                className={`relative w-full flex flex-col space-y-2 px-4 py-4 bg-white`}
              >
                <h2
                  className={`relative w-full text-xs font-semibold`}
                >{`Frequently Visited:`}</h2>
                <div className={`relative flex w-full space-x-4`}>
                  <p
                    className={`relative w-fit text-xs text-gray-500 font-sans font-medium`}
                  >
                    Track Order
                  </p>
                  <p
                    className={`relative w-fit text-xs text-gray-500 font-sans font-medium`}
                  >
                    Help Center
                  </p>
                </div>
              </div>
            </div>
            {/* Personal Profile Section */}
            {profileSection === sectionList[0] && (
              <div
                className={`relative flex flex-col w-[80%] md:w-[70%] px-6 py-2 overflow-y-scroll space-y-4 bg-white`}
              >
                <InfoContainer
                  header={`Personal Information`}
                  text={userDetail.user_Name}
                />
                {/* <InfoContainer header={`Your Gender`} text={`male`} /> */}
                <GenderSection
                  header={`Your Gender`}
                  type={userDetail.user_Gender}
                />
                <InfoContainer
                  header={`Email Address`}
                  text={userDetail.user_Email_Id}
                />
                <InfoContainer
                  header={`User mobile number`}
                  text={userDetail.user_Mobile_Number}
                />
                <FaqList />
              </div>
            )}
            {/* Order History Section */}
            {profileSection === sectionList[1] && (
              <div
                className={`relative flex flex-col w-[80%] md:w-[70%] px-9 py-2 overflow-y-scroll space-y-3 bg-white`}
              >
                <div className={`relative flex w-full py-3 rounded-md mb-3`}>
                  <input
                    className={`border border-gray-400 text-sm font-sans px-3 py-3 w-[82.5%]`}
                    type={"text"}
                    name="name"
                    placeholder={`Search your orders here`}
                    value={""}
                    onChange={(val) => {}}
                  />
                  <button
                    className={`relative w-[17.5%] h-full text-white font-sans font-medium bg-blue-600`}
                  >
                    Search
                  </button>
                </div>
                <div
                  className={`relative flex flex-col space-y-2 w-full h-full overflow-y-scroll py-2`}
                >
                  {orderList.map(
                    (product: ProductOrderDetails, index: number) => (
                      <ProductOrderTab key={index} productInfo={product} />
                    )
                  )}
                </div>
              </div>
            )}
            {profileSection === sectionList[2] && (
              <div
                className={`relative flex flex-col w-[80%] md:w-[70%] px-3 py-2 overflow-y-scroll space-y-3 bg-white`}
              ></div>
            )}
            {profileSection === sectionList[3] && (
              <div
                className={`relative flex flex-col w-[80%] md:w-[70%] px-3 py-2 overflow-y-scroll space-y-3 bg-white`}
              ></div>
            )}
          </div>
          {showChatBox && (
            <ChatBox
              showChatBox={showChatBox}
              setShowChatBox={setShowChatBox}
              setDisplayImgUrl={setDisplayImgUrl}
              setFlipkartUrl={setFlipkartUrl}
            />
          )}
        </div>
        {!showChatBox && (
          <div
            className={`absolute bg-[#27293e] hover:bg-blue-700 h-16 w-16 rounded-full p-3 right-5 bottom-5 z-10 cursor-pointer shadow-2xl`}
          >
            <Image
              onClick={() => {
                setShowChatBox(true);
              }}
              alt="img"
              src={"/wizzard.png"}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </main>
    </Fragment>
  );
}

export const ProductOrderTab = (props: any) => {
  return (
    <div
      className={`relative flex w-full px-8 py-4 border-[0.1px] border-gray-400 align-middle rounded-md hover:shadow-lg cursor-pointer`}
    >
      <Image
        alt="img"
        // className={`rounded-full`}
        src={props.productInfo.order_Product_Details.product_Image_Url}
        layout="fixed"
        objectFit="cover"
        width={90}
        height={80}
      />
    </div>
  );
};

export const InfoContainer = (props: any) => {
  return (
    <div className={`relative flex flex-col w-full py-3 space-y-3`}>
      <div className={`relative flex w-full space-x-5`}>
        <h1 className={`relative font-semibold text-md text-black font-sans`}>
          {props.header}
        </h1>
        <p className={`relative text-blue-600 font-medium cursor-pointer`}>
          Edit
        </p>
      </div>
      <div
        className={`relative w-full sm:w-[75%] md:w-[50%] lg:w-[60%] flex py-3 px-3 bg-gray-100 border-[1px] border-gray-200`}
      >
        <p className={`relative w-full font-normal text-md text-gray-500`}>
          {props.text}
        </p>
      </div>
    </div>
  );
};

export const GenderSection = (props: any) => {
  // const [selectedGender, setSelectedGender] = useState<string>(props.type.toLowerCase()); // To keep track of the selected gender
  // console.log(props.type.toLowerCase());

  // const handleGenderChange = (gender: string) => {
  //   // setSelectedGender(gender);
  // };
  return (
    <div className={`relative flex flex-col w-full py-3 space-y-3`}>
      <div className={`relative flex w-full space-x-5`}>
        <h1 className={`relative font-semibold text-md text-black font-sans`}>
          {props.header}
        </h1>
        <p className={`relative text-blue-600 font-medium cursor-pointer`}>
          Edit
        </p>
      </div>
      <div className={`relative flex w-full space-x-8`}>
        <div className={`relative fflex`}>
          <label
            className={`checkbox flex space-x-3 ${
              props.type.toLowerCase() === "male" ? "selected" : ""
            }`}
          >
            <input
              type="checkbox"
              value="male"
              checked={props.type.toLowerCase() === "male"}
              // onChange={() => {}}
            />
            <p>Male</p>
          </label>
        </div>
        <div className={`relative flex`}>
          <label
            className={`checkbox flex space-x-3 ${
              props.type.toLowerCase() === "female" ? "selected" : ""
            }`}
          >
            <input
              type="checkbox"
              value="female"
              checked={props.type.toLowerCase() === "female"}
              // onChange={() => {}}
            />
            <p>Female</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export const FaqList = (props: any) => {
  return (
    <div className={`realtive flex flex-col w-full space-y-6 pb-12`}>
      <h1 className={`relative w-full font-semibold my-3`}>{`FAQs`}</h1>
      <div className={`relative flex flex-col w-full space-y-3`}>
        <h3
          className={`relative w-full font-semibold text-sm`}
        >{`What happens when I update my email address (or mobile number)?`}</h3>
        <p
          className={`relative w-full text-sm text-gray-600`}
        >{`Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).`}</p>
      </div>
      <div className={`relative flex flex-col w-full space-y-3`}>
        <h3
          className={`relative w-full font-semibold text-sm`}
        >{`When will my Flipkart account be updated with the new email address (or mobile number)?`}</h3>
        <p
          className={`relative w-full text-sm text-gray-600`}
        >{`It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.`}</p>
      </div>
      <div className={`relative flex flex-col w-full space-y-3`}>
        <h3
          className={`relative w-full font-semibold text-sm`}
        >{`What happens to my existing Flipkart account when I update my email address (or mobile number)?`}</h3>
        <p
          className={`relative w-full text-sm text-gray-600`}
        >{`Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.`}</p>
      </div>
      <div className={`relative flex flex-col w-full space-y-3`}>
        <h3
          className={`relative w-full font-semibold text-sm`}
        >{`Does my Seller account get affected when I update my email address?`}</h3>
        <p
          className={`relative w-full text-sm text-gray-600`}
        >{`Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.`}</p>
      </div>
    </div>
  );
};