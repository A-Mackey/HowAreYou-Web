// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDalVCG02ebyM_pWOrMpa6adLREgqWIbMY",
  authDomain: "howareyou-cf46a.firebaseapp.com",
  projectId: "howareyou-cf46a",
  storageBucket: "howareyou-cf46a.appspot.com",
  messagingSenderId: "425872900783",
  appId: "1:425872900783:web:de8bed4a8ed81bf89c0a5a",
  measurementId: "G-210QZ9RSK0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
