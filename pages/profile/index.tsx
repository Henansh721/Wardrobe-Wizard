import Image from "next/image";
import { Fragment, useState } from "react";
import Head from "next/head";
import ChatBox from "@/components/chat/chatBox";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  let sectionList = ["personal-info", "my-orders", "my-cart", "gpt-details"];
  const [profileSection, setProfileSection] = useState<string>(sectionList[0]);
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const [displayImgUrl, setDisplayImgUrl] = useState<string>("");
  const [flipkartUrl, setFlipkartUrl] = useState<string>("");
  const [itemSize, setItemSize] = useState<number[]>([
    10, 20, 30, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  ]);

  return (
    <Fragment>
      <Head>
        <title>{`User Profile`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`w-screen h-screen flex`}>
        <div className={`relative w-full flex h-full`}>
          <div
            className={`relative flex flex-row w-full h-full space-x-2 p-3 mx-auto justify-center`}
          >
            {displayImgUrl !== "" && (
              <div
                className={`absolute w-full h-full flex flex-row space-x-2 p-1 z-10 bg-slate-200`}
              >
                <div className={`relative flex flex-col w-[40%] h-full`}>
                  {/* <div
                    onClick={() => {
                      setDisplayImgUrl("");
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
                  </div> */}
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
              className={`relative flex flex-col w-[15%] md:w-[20%] shadow-2xl space-y-3`}
            >
              <div
                onClick={() => {
                  setProfileSection(sectionList[0]);
                }}
                className={`relative flex w-full px-2 py-4 space-x-4 shadow-lg hover:shadow-xl border-[1px] border-gray-200 text-gray-500 font-semibold text-lg cursor-pointer ${
                  profileSection === sectionList[0] ? "bg-blue-300" : "bg-white"
                }`}
              >
                <Image
                  alt="img"
                  className={`rounded-full`}
                  src={"/user-icon.png"}
                  layout="fixed"
                  objectFit="cover"
                  width={70}
                  height={70}
                />
                <div
                  className={`relative flex flex-col w-full h-full justify-evenly`}
                >
                  <p className={`relative w-full text-xs`}>Hello,</p>
                  <p
                    className={`relative w-full font-semibold text-md text-black`}
                  >
                    Henansh Tanwar
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setProfileSection(sectionList[1]);
                }}
                className={`relative flex justify-center w-full px-2 py-4 shadow-md hover:shadow-xl border-[1px] border-gray-200 text-gray-500 font-semibold text-lg cursor-pointer ${
                  profileSection === sectionList[1] ? "bg-blue-300" : "bg-white"
                }`}
              >
                My Orders
              </div>
              <div
                onClick={() => {
                  setProfileSection(sectionList[2]);
                }}
                className={`relative flex justify-center w-full px-2 py-4 shadow-md hover:shadow-xl border-[1px] border-gray-200 text-gray-500 font-semibold text-lg cursor-pointer ${
                  profileSection === sectionList[2] ? "bg-blue-300" : "bg-white"
                }`}
              >
                My Cart
              </div>
              <div
                onClick={() => {
                  setProfileSection(sectionList[3]);
                }}
                className={`relative flex justify-center w-full px-2 py-4 shadow-md hover:shadow-xl border-[1px] border-gray-200 text-gray-500 font-semibold text-lg cursor-pointer ${
                  profileSection === sectionList[3] ? "bg-blue-300" : "bg-white"
                }`}
              >
                GPT Details
              </div>
            </div>
            {profileSection === sectionList[0] && (
              <div
                className={`relative flex flex-col w-[80%] md:w-[70%] shadow-2xl px-3 py-2 overflow-y-scroll space-y-3`}
              >
                <InfoContainer header={`User name`} text={`Henansh Tanwar`} />
                <InfoContainer header={`User gender`} text={`male`} />
                <InfoContainer header={`User emial id`} text={`henanshtanwar@gmail.com`} />
                <InfoContainer header={`User mobile number`} text={`1234567890`} />
              </div>
            )}
            {profileSection === sectionList[1] && (
              <div
                className={`relative flex flex-col w-[80%] md:w-[70%] shadow-2xl px-3 py-2 overflow-y-scroll space-y-3`}
              ></div>
            )}
            {profileSection === sectionList[2] && (
              <div
                className={`relative flex flex-col w-[80%] md:w-[70%] shadow-2xl px-3 py-2 overflow-y-scroll space-y-3`}
              ></div>
            )}
            {profileSection === sectionList[3] && (
              <div
                className={`relative flex flex-col w-[80%] md:w-[70%] shadow-2xl px-3 py-2 overflow-y-scroll space-y-3`}
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
      </main>
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
    </Fragment>
  );
}

export const InfoContainer = (props: any) => {
  return (
    <div
      className={`relative flex flex-col w-full py-3 px-5 space-y-1 bg-slate-100 rounded-lg shadow-md`}
    >
      <h1
        className={`relative w-full font-semibold text-md text-gray-500 font-serif`}
      >
        {props.header}
      </h1>
      <p className={`relative w-full font-medium text-xl font-sans`}>
        {props.text}
      </p>
    </div>
  );
};
