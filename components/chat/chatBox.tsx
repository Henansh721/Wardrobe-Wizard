import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  showChatBox: boolean;
  setShowChatBox: Function;
};

export default function ChatBox(props: Props) {
  const router = useRouter();
  const [textMessage, setTextMessage] = useState<string>("");
  const [isConversationOn, setIsConversationOn] = useState<boolean>(false);
  const [selectOrderHistory, setSelectOrderHistory] = useState<boolean>(true);
  const [userChatList, setUserChatList] = useState<string[]>([]);
  const [gptChatList, setGptChatList] = useState<string[]>([]);
  const [globalChatList, setGlobalChatList] = useState<string[]>([]);

  const orderHistoryHandler = (val: boolean) => {
    setSelectOrderHistory(val);
  };
  const conversationClearHandler = () => {
    setIsConversationOn(false);
    setGlobalChatList([]);
    setUserChatList([]);
    setGptChatList([]);
  };

  const messageSubmitHandler = (event: any) => {
    event.preventDefault();
    setIsConversationOn(true);
    if (textMessage.trim().length > 0) {
      let list = userChatList;
      list.push(textMessage.trim());
      setUserChatList(list);
      setGlobalChatList(list);
    }
    setTextMessage("");
  };

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0.0, x: 50 }}
        transition={{ duration: 2.0, type: "spring" }}
        whileInView={{ opacity: 1, x: 0 }}
        className={`relative flex flex-col right-0 h-screen w-full lg:w-[50%] xl:w-[45%] rounded-l-xl bg-white border-l-[2px] border-gray-300 `}
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
          } ${isConversationOn ? "opacity-10" : "opacity-100"}`}
        >
          <Image
            onClick={conversationClearHandler}
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
          className={`relative flex flex-col-reverse my-1 w-full px-4 h-full overflow-y-scroll z-10 mx-auto `}
        >
          {globalChatList.map((chat: string, index: number) => {
            if (index % 2 == 0) {
              return (
                <div
                  key={index}
                  className="relative flex flex-row-reverse w-full mt-2"
                >
                  <div
                    className={`absolute bg-[#27293e] h-7 w-7 rounded-full top-0 -mt-3 -mr-2 right-0 z-40`}
                  >
                    <Image
                      alt="img"
                      className={`rounded-full`}
                      src={"/user-icon.png"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="relative flex flex-col max-w-[85%]">
                    <div className="rounded-l-full rounded-br-full overflow-hidden bg-blue-700 text-white">
                      <div className="max-h-[5rem] overflow-hidden break-all py-2 px-5">
                        {globalChatList[globalChatList.length - index - 1]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="relative flex flex-row w-full mt-2">
                  <div
                    className={`absolute bg-blue-700 h-7 w-7 rounded-full p-2 top-0 -mt-3 -ml-2 left-0 z-40`}
                  >
                    <Image
                      alt="img"
                      src={"/wizzard.png"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="relative flex flex-col max-w-[85%]">
                    <div className="rounded-r-full rounded-bl-full overflow-hidden bg-[#27293e] text-white">
                      <div className="max-h-[5rem] overflow-hidden break-all py-2 px-5">
                        {globalChatList[globalChatList.length - index - 1]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div
          className={`relative flex flex-col bottom-0 w-full h-[10%] pb-4 pt-1 z-30`}
        >
          {/* <div
            className={`absolute flex w-fit left-1 justify-center align-middle items-center text-center space-x-1 mx-auto top-0 -mt-7 z-40 bg-gray-400 p-1 rounded-full`}
          >
            <div className={`relative bg-blue-700 h-4 w-4 rounded-full p-1`}>
              <Image
                className={`rounded-full`}
                alt="img"
                src={"/loading-animation.gif"}
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
