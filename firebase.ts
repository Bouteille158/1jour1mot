import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeI8XN8ZHwfeWDW8KJDXbzYykJ0Zrpqvw",
  authDomain: "jour1mot-9e04e.firebaseapp.com",
  projectId: "jour1mot-9e04e",
  storageBucket: "jour1mot-9e04e.appspot.com",
  messagingSenderId: "383078431930",
  appId: "1:383078431930:web:ced58d1097442424335683",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
export { app, auth };
