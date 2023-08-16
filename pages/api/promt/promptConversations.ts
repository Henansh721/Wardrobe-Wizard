import { db } from "@/lib/firebase";
import { USER_COLLECTION_NAME } from "@/lib/helper";

import { doc, getDoc, setDoc } from "firebase/firestore";

async function handler(req: any, res: any) {
  const { msg } = req.body;
  //   const { userId } = req.query;
  console.log(msg);

  try {
    res.status(201).json({
      msg: `Sending message from server, ${msg}`,
    });
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in fetching user prompts",
    });
  }
}

export default handler;
