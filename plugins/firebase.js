import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCs4BlHsN_nagKvVLaJSZhpSIss9ENreFw",
  authDomain: "overviewnuxt-auth.firebaseapp.com",
  projectId: "overviewnuxt-auth",
  storageBucket: "overviewnuxt-auth.appspot.com",
  messagingSenderId: "622908359631",
  appId: "1:622908359631:web:b48ca995338c673d8388ba",
  measurementId: "G-E5S5S1S20B",
};

let app = nil;

if (!firebase.app.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
