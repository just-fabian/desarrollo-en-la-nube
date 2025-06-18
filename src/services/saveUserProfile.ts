import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface UserProfile {
  uid: string;
  name: string;
  address: string;
  birthDate: Timestamp; 
  email: string;
  createdAt: number;
}

export async function saveUserProfile(profile: UserProfile) {
  const userDoc = doc(db, "users", profile.uid);
  await setDoc(userDoc, profile);
}
