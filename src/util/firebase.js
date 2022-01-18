// import * as firebase from 'firebase';
// import firebase from 'firebase/app';
import firebase from "firebase";
import "firebase/storage";
import "firebase/auth";


console.log('process.env.REACT_APP_FIREBASE_API_KEY',process.env.REACT_APP_FIREBASE_API_KEY)
// import { initializeApp } from 'firebase/app';
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB5uX_WSYjoc5p2RCVjlzvjAkAD5yCvMRY",
//   authDomain: "coderjook-scratch-app.firebaseapp.com",
//   projectId: "coderjook-scratch-app",
//   storageBucket: "coderjook-scratch-app.appspot.com",
//   messagingSenderId: "544346815982",
//   appId: "1:544346815982:web:0dcee514db5eb09b3b22ff",
// //   measurementId: "G-6M86NSQSPQ"
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyAgbx9p_oN0rFYo3OS-Rw6AGZ4h476pnAA",
  // authDomain: "scratch-tutorials-45392.firebaseapp.com",
  // databaseURL: "https://scratch-tutorials-45392-default-rtdb.europe-west1.firebasedatabase.app",
  // projectId: "scratch-tutorials-45392",
  // storageBucket: "scratch-tutorials-45392.appspot.com",
  // messagingSenderId: "1078204108425",
  // appId: "1:1078204108425:web:0eb49a016a7f31661f4058"

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

// const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();