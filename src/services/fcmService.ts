import { getToken, onMessage } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { db, messaging } from "./firebaseConfig";

export async function saveFcmTokenForUser(uid: string) {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return;
    }

    const fcmToken = await getToken(messaging, {
      vapidKey:
        "BHFYdf1bzO-yIwpvuoOaJWCplPDu4PWsbFWSHf1IS0JG9XYJvyamv7122Nplk7qcQqSI-dmW5VpmNfFc-EAmyww",
    });
    if (!fcmToken) {
      console.log("No registration token available");
      return;
    }

    await setDoc(doc(db, "users", uid), { fcmToken }, { merge: true });

    console.log("FCM Token saved to Firestore:", fcmToken);
  } catch (error) {
    console.error("Error getting FCM token", error);
  }
}

export function onMessageListener(callback: (payload: any) => void) {
  return onMessage(messaging, callback);
}
