import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: "challenge-openai.firebaseapp.com",
  projectId: "challenge-openai",
  storageBucket: "challenge-openai.appspot.com",
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_API_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
