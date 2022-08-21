import firebase from "firebase";

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

export const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(
  "BA6YtQwQ6iW9ApOJufZfR-0vXMsqR2x1eU_BWpfSwRKgeb35HYeAk0kUQLpdbirBzlmU-KccGB0LLnI3ygrzB1M"
);
