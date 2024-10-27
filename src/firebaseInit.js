// firebaseInit.js
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firbaseConfig";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const auth = firebaseApp.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
