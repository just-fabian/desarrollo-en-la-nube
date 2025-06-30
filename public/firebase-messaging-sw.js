importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCQu4_0svGItpSShmPO2G1DX93aUhBDNHY",
  authDomain: "desarrollo-en-la-nube-7e9ff.firebaseapp.com",
  projectId: "desarrollo-en-la-nube-7e9ff",
  storageBucket: "desarrollo-en-la-nube-7e9ff.firebasestorage.app",
  messagingSenderId: "193650308490",
  appId: "1:193650308490:web:1b9c7d7f12e5ca2a850473",
  measurementId: "G-L8Z0XPBL86",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/vite.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
