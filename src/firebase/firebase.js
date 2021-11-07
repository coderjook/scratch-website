import firebase from "firebase";
import "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5uX_WSYjoc5p2RCVjlzvjAkAD5yCvMRY",
  authDomain: "coderjook-scratch-app.firebaseapp.com",
  projectId: "coderjook-scratch-app",
  storageBucket: "coderjook-scratch-app.appspot.com",
  messagingSenderId: "544346815982",
  appId: "1:544346815982:web:0dcee514db5eb09b3b22ff",
  measurementId: "G-6M86NSQSPQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };