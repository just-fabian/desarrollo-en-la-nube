import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQu4_0svGItpSShmPO2G1DX93aUhBDNHY",
  authDomain: "desarrollo-en-la-nube-7e9ff.firebaseapp.com",
  projectId: "desarrollo-en-la-nube-7e9ff",
  storageBucket: "desarrollo-en-la-nube-7e9ff.firebasestorage.app",
  messagingSenderId: "193650308490",
  appId: "1:193650308490:web:1b9c7d7f12e5ca2a850473",
  measurementId: "G-L8Z0XPBL86",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("email");
