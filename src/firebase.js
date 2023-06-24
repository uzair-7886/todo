// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { doc, setDoc } from "firebase/firestore";
import {async } from '@firebase/util'


const firebaseapi=import.meta.env.VITE_FIREBASE_API_KEY
// console.log(firebaseapi)
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseapi,
  authDomain: "todo-2eb81.firebaseapp.com",
  projectId: "todo-2eb81",
  storageBucket: "todo-2eb81.appspot.com",
  messagingSenderId: "711225517156",
  appId: "1:711225517156:web:4a3d7fffac3c71529c6b71",
  measurementId: "G-S2CD1MPD0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);


