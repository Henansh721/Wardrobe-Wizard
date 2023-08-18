import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { USER_COLLECTION_NAME } from "@/lib/helper";
import { db } from "@/lib/firebase";

export const userPromptApiHandler = async (userId: string, prompt: any) => {
  const response = await fetch("https://fashion-outfit-generator.onrender.com/generate/outfit", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      prompt: prompt.displayMsg,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

type Props = {
  showChatBox: boolean;
  setShowChatBox: Function;
  setDisplayImgUrl: Function;
  setFlipkartUrl: Function;
};

export default function ChatBox(props: Props) {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("CRrie9tuvow0lmrMDbO0");
  const [userMsgCnt, setUserMsgCnt] = useState<number>(0);
  const [gptMsgCnt, setGptMsgCnt] = useState<number>(0);
  const [textMessage, setTextMessage] = useState<string>("");
  const [isConversationOn, setIsConversationOn] = useState<boolean>(false);
  const [selectOrderHistory, setSelectOrderHistory] = useState<boolean>(true);
  const [globalChatList, setGlobalChatList] = useState<any[]>([]);

  const orderHistoryHandler = (val: boolean) => {
    setSelectOrderHistory(val);
  };
  const conversationClearHandler = async () => {
    setIsConversationOn(false);
    setGlobalChatList([]);
    const docRef = doc(db, USER_COLLECTION_NAME, userId);
    const response = await updateDoc(docRef, {
      user_Prompts_List: [],
    });
  };

  const messageSubmitHandler = async (event: any) => {
    event.preventDefault();
    const txt = textMessage.trim();
    setTextMessage("");
    if (txt.length > 0) {
      setIsConversationOn(true);
      let list = globalChatList;
      list = list.reverse();
      let obj = {
        type: "user",
        displayMsg: txt,
        promptMsg: {},
        responseList: [],
      };
      list.push(obj);
      list = list.reverse();
      setUserMsgCnt(userMsgCnt + 1);
      setGlobalChatList(list);
      // await userPromptApiHandler(userId, obj);
    }
  };

  useEffect(() => {
    const updateUserChatList = onSnapshot(
      doc(db, USER_COLLECTION_NAME, "CRrie9tuvow0lmrMDbO0"),
      (doc) => {
        let pList = doc.data()?.user_Prompts_List;
        console.log(pList);
        let revList = pList.reverse();
        setGlobalChatList(revList);
        if (pList.length > 0 && !isConversationOn) {
          setIsConversationOn(true);
        }
      }
    );

    return () => {
      updateUserChatList();
    };
  }, [isConversationOn]);

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0.0, x: 50 }}
        transition={{ duration: 2.0, type: "spring" }}
        whileInView={{ opacity: 1, x: 0 }}
        className={`relative flex flex-col right-0 w-full h-full lg:w-[50%] xl:w-[45%] rounded-l-xl bg-white border-l-[2px] border-gray-300 `}
      >
        <div
          className={`relative top-0 w-full h-[7%] px-1 py-2 bg-[#27293e] rounded-tl-xl z-30`}
        >
          <h1 className={`sans-serif text-center text-md text-white`}>
            Wardrobe Wizard
          </h1>
          <Image
            onClick={() => {
              props.setShowChatBox(false);
            }}
            className={`absolute right-1 top-1 rounded-full cursor-pointer z-10`}
            alt="img"
            width={33}
            height={33}
            src={"/cross.png"}
          />
        </div>
        <div
          className={`absolute my-auto justify-center align-middle items-center w-full h-full flex flex-col ${
            isConversationOn ? "z-0" : "z-20"
          } ${isConversationOn ? "opacity-0" : "opacity-100"}`}
        >
          <Image
            className={`mb-2`}
            alt="img"
            width={150}
            height={100}
            quality={100}
            src={"/flipkart-logo.png"}
          />
          <h2
            className={`relative w-full p-1 text-center text-md sans-serif mb-1`}
          >
            Choose your conversation preference
          </h2>
          <div
            className={`relative flex w-[87.5%] space-x-2 bg-[#27293e] p-[6px] mx-auto rounded-xl  mb-2`}
          >
            <button
              onClick={() => {
                orderHistoryHandler(true);
              }}
              className={`relative w-full px-5 py-[6px] rounded-md justify-center text-center ${
                selectOrderHistory ? "bg-blue-700" : "bg-[#27293e]"
              } cursor-pointer text-white sans-serif font-semibold text-xs`}
            >
              Consider Past Order History
            </button>
            <button
              onClick={() => {
                orderHistoryHandler(false);
              }}
              className={`relative w-full px-5 py-[6px] rounded-md justify-center text-center ${
                !selectOrderHistory ? "bg-blue-700" : "bg-[#27293e]"
              } cursor-pointer text-white sans-serif font-semibold text-xs`}
            >
              {`Don't`} Consider Past Order History
            </button>
          </div>
          <button
            className={`relative flex flex-col w-[87.5%] bg-gray-500 hover:bg-gray-600 cursor-pointer p-[7px] mx-auto rounded-xl text-center justify-center items-center align-middle`}
          >
            <h2
              className={`relative w-full text-center sans-serif text-white font-semibold`}
            >
              Try Attire Alchemist
            </h2>
            <p
              className={`relative w-full text-center sans-serif text-[10px] text-white`}
            >
              Magically recommend personalized outfits
            </p>
          </button>
        </div>

        <div
          className={`relative flex flex-col-reverse my-1 w-[92.5%] h-full overflow-y-scroll z-10 mx-auto`}
        >
          {globalChatList.map((prompt: any, index: number) => {
            if (prompt.type === "user") {
              return (
                <div
                  key={index}
                  className="relative flex flex-row-reverse w-full mt-3"
                >
                  <div className="relative flex flex-row max-w-[85%]">
                    <div className="rounded-l-full rounded-br-full overflow-y-scroll bg-blue-700 text-white overflow-auto break-all py-2 px-5">
                      {prompt.displayMsg}
                    </div>
                  </div>
                </div>
              );
            } else if (prompt.type === "assistant") {
              return (
                <div
                  key={index}
                  className="relative flex flex-col space-y-1 w-full mt-3"
                >
                  <div className="relative flex flex-row max-w-[85%] space-x-[1px]">
                    <div
                      className={`relative bg-blue-700 h-5 w-5 rounded-full p-3 top-0 left-0`}
                    >
                      <Image
                        alt="img"
                        src={"/wizzard.png"}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="rounded-r-full rounded-bl-full bg-[#27293e] text-white overflow-hidden break-all py-2 px-5">
                      {prompt.displayMsg}
                    </div>
                  </div>
                  {prompt.responseList.length > 0 && (
                    <div
                      className={`relative flex flex-col p-1 rounded-lg bg-gray-200 mx-auto w-full`}
                    >
                      <div
                        className={`relative w-full flex flex-row overflow-x-scroll p-1 space-y-1`}
                      >
                        {prompt.responseList.map(
                          (fashionObj: any, index: number) => (
                            <div
                              key={index}
                              className={`relative flex flex-col cursor-pointer`}
                              onClick={() => {
                                props.setDisplayImgUrl(fashionObj.imageUrl);
                                props.setFlipkartUrl(fashionObj.flipkartUrl);
                              }}
                            >
                              <div className={`realtive w-36 h-44 rounded-lg`}>
                                <Image
                                  alt="img"
                                  className={`rounded-lg p-2 hover:bg-blue-700`}
                                  src={fashionObj.imageUrl}
                                  layout="fill"
                                  objectFit="cover"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              return <div key={index} />;
            }
          })}
        </div>

        <div
          className={`relative flex flex-col bottom-0 w-full h-[10%] pb-4 pt-1 z-30`}
        >
          {/* <div
            className={`absolute flex w-fit left-10 justify-center align-middle items-center text-center space-x-1 mx-auto top-0 -mt-10 z-40 p-1 rounded-full`}
          >
            <div className={`relative bg-blue-700 h-7 w-7 rounded-full p-1`}>
              <Image
                className={`rounded-full`}
                alt="img"
                src={"/circles-menu.gif"}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className={`font-mono text-xs`}>responding</p>
          </div> */}
          <form
            onSubmit={messageSubmitHandler}
            className={`relative flex w-full md:w-[92.5%] mx-auto align-middle items-center space-x-2`}
          >
            {/* <div className={`relative rounded-full p-2 bg-blue-700`}>⫸</div> */}
            <Image
              onClick={conversationClearHandler}
              className={`rounded-full bg-blue-600 hover:bg-blue-500 p-1 cursor-pointer`}
              alt="img"
              width={50}
              height={50}
              src={"/broom.png"}
            />
            <div className={`relative flex w-full`}>
              <input
                className={`px-4 py-3 rounded-full border font-normal border-gray-500 text-md w-full sans-serif`}
                type={"text"}
                name="email"
                placeholder={"Ask me to suggest an outfit..."}
                value={textMessage}
                maxLength={800}
                onChange={(val) => {
                  setTextMessage(val.target.value);
                }}
              />
            </div>
          </form>
        </div>
      </motion.div>
    </Fragment>
  );
}
