import { db } from "@/lib/firebase";
import { USER_COLLECTION_NAME } from "@/lib/helper";

import { doc, getDoc, setDoc } from "firebase/firestore";

async function handler(req: any, res: any) {
  const { userId, prompt } = req.body;
  //   const { userId } = req.query;

  const response = await fetch(
    "https://fashion-outfit-generator.onrender.com/generate/outfit",
    {
      method: "POST",
      body: JSON.stringify({
        userID: userId,
        prompt: prompt.displayMsg,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  try {
    res.status(201).json({ response });
  } catch (error) {
    res.status(422).json({
      details: null,
      error: error,
      message: "Unsuccessful in fetching user prompts",
    });
  }
}

export default handler;
