// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeAuth } from "firebase/auth";
// import { getReactNativePersistence } from "firebase/auth/react-native";

// const fireApp = firebase.initializeApp(firebaseConfig);
// const auth = initializeAuth(fireApp, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
// // const auth = fireApp.auth();
// export { fireApp as fireApp, auth };

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeI8XN8ZHwfeWDW8KJDXbzYykJ0Zrpqvw",
  authDomain: "jour1mot-9e04e.firebaseapp.com",
  projectId: "jour1mot-9e04e",
  storageBucket: "jour1mot-9e04e.appspot.com",
  messagingSenderId: "383078431930",
  appId: "1:383078431930:web:ced58d1097442424335683",
};

const fireApp = firebase.initializeApp(firebaseConfig);

initializeAuth(fireApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default firebase;
