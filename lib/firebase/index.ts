// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqVHVHeTw007Ak_P6_cmSHiJQeQw9ci0M",
  authDomain: "project-grid-262db.firebaseapp.com",
  projectId: "project-grid-262db",
  storageBucket: "project-grid-262db.appspot.com",
  messagingSenderId: "889085843161",
  appId: "1:889085843161:web:a7fcb7326b11260e3710c8",
  measurementId: "G-SRVTDLPZPX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();