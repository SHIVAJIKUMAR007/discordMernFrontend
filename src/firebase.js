import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCcVCjjh8oan-sVyyonlvbETby5rDno6Ps",
  authDomain: "discord-clone-693f0.firebaseapp.com",
  databaseURL: "https://discord-clone-693f0.firebaseio.com",
  projectId: "discord-clone-693f0",
  storageBucket: "discord-clone-693f0.appspot.com",
  messagingSenderId: "1069644443900",
  appId: "1:1069644443900:web:38228365b2800d31e32779",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
