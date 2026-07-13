import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfhWxYDNWra5ZgTA0k4tr8tQRv_eApHT4",
  authDomain: "badmintonmatchschedule.firebaseapp.com",
  projectId: "badmintonmatchschedule",
  storageBucket: "badmintonmatchschedule.firebasestorage.app",
  messagingSenderId: "639993799050",
  appId: "1:639993799050:web:1be03635afd06320a4a873",
  measurementId: "G-5ZBTPBDM0H",
};

const app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let auth = getAuth(app);

export { db, auth };
