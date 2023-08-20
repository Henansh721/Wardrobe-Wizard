import { Fragment, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import ChatBox from "@/components/chat/chatBox";

export const updateAPI = async () => {
  const response = await fetch("/api/user/updateUserPrompt", {
    method: "POST",
    body: JSON.stringify({
      userId: "CRrie9tuvow0lmrMDbO0",
      prompt: {
        type: "user",
        displayMsg: "Hello There, Wassup!",
        promptMsg: {},
        responseList: [],
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

export default function Home() {
  const router = useRouter();
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const [displayImgUrl, setDisplayImgUrl] = useState<string>("");
  const [flipkartUrl, setFlipkartUrl] = useState<string>("");
  const [outfitName, setOutfitName] = useState<string>("");
  return (
    <Fragment>
      <Head>
        <title>{`Add Product`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`relative flex`}>
        {/* <button onClick={updateAPI}>Post</button> */}
        <div className={`relative flex flex-col w-full`}>
          <h2 className={`bg-blue-400 text-white`}>Main Page</h2>
          <Link href={`/addProduct`}>Add Product</Link>
          <Link href={`/profile`}>Profile</Link>
        </div>
        {showChatBox && (
          <ChatBox
            showChatBox={showChatBox}
            setShowChatBox={setShowChatBox}
            setDisplayImgUrl={setDisplayImgUrl}
            setFlipkartUrl={setFlipkartUrl}
            setOutfitName={setOutfitName}
          />
        )}
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
