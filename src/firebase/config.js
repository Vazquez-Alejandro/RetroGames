import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUgulJFu0neLINeEgl0kcTX2O1Bn7fTsw",
  authDomain: "retro-games-ec467.firebaseapp.com",
  databaseURL: "https://retro-games-ec467-default-rtdb.firebaseio.com",
  projectId: "retro-games-ec467",
  storageBucket: "retro-games-ec467.firebasestorage.app",
  messagingSenderId: "686028182144",
  appId: "1:686028182144:web:b66893c596cb426b0a8c65",
  measurementId: "G-WSTKZFGLGD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
