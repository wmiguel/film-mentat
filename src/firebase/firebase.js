// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FIREBASE_APIKEY = process.env.REACT_APP_FIREBASE_APIKEY;
const FIREBASE_AUTHDOMAIN = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
const FIREBASE_PROJECTID = process.env.REACT_APP_FIREBASE_PROJECTID;
const FIREBASE_STORAGEBUCKET = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;
const FIREBASE_MESSAGINGSENDERID =
  process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID;
const FIREBASE_APPID = process.env.REACT_APP_FIREBASE_APPID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);