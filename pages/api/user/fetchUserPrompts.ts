import { db } from "@/lib/firebase";
import {
  USER_COLLECTION_NAME,
} from "@/lib/helper";

import { doc, getDoc, setDoc } from "firebase/firestore";

async function handler(req: any, res: any) {
  const { userId } = req.body;

  try {
    const docRef = doc(db, USER_COLLECTION_NAME, userId);
    const userInfo = await getDoc(docRef);

    let promptsList = userInfo.data()?.user_Prompts_List;

    res.status(201).json(promptsList);
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in fetching user prompts",
    });
  }
}

export default handler;
