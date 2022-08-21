importScripts("https://www.gstatic.com/firebasejs/7.9.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.2/firebase-messaging.js");

const initializedFirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDlpAmVhDe_YiOWmtfBeYP6ngjh1tTPPro",
  authDomain: "klist-app.firebaseapp.com",
  databaseURL: "https://klist-app.firebaseio.com",
  projectId: "klist-app",
  storageBucket: "klist-app.appspot.com",
  messagingSenderId: "391965433987",
  appId: "1:391965433987:web:bcc8cda4785b5b8b9b7bb6",
  measurementId: "G-6Z6YLH1MER"
});

const messaging = initializedFirebaseApp.messaging();

messaging.setBackgroundMessageHandler(payload => {
  console.log("Received background", payload);
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage({
          firebaseMessaging: {
            payload
          }
        });
      }
    });
  return promiseChain;
});

console.log("Registered sw");
