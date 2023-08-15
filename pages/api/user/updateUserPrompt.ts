import { db } from "@/lib/firebase";
import { USER_COLLECTION_NAME } from "@/lib/helper";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

async function handler(req: any, res: any) {
  const { userId, promptMessage } = req.body;

  try {
    const docRef = doc(db, USER_COLLECTION_NAME, userId);
    const userInfo = await getDoc(docRef);

    const promptsList = userInfo.data()?.user_Prompts_List;
    const updatedPromptsList = [...promptsList, promptMessage];
    const response = await updateDoc(docRef, {
      user_Prompts_List: updatedPromptsList,
    });

    res.status(201).json(updatedPromptsList);
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in updating user prompts",
    });
  }
}

export default handler;
