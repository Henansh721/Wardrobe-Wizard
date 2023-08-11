import { auth, db } from "@/lib/firebase";

import { doc, getDoc, getDocs, collection } from "firebase/firestore";

async function handler(req: any, res: any) {
  const receivedData = req.body;
  const { userId } = receivedData;

  try {
    

    res.status(201).json({
      userDetails: null,
      error: null,
      message: "Successfully fetched user personal information",
    });
  } catch (error) {

  }
}

export default handler;

