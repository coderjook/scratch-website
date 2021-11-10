// import * as firebase from 'firebase';
// import firebase from 'firebase/app';
import firebase from "firebase";
import "firebase/storage";


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
  apiKey: "AIzaSyAgbx9p_oN0rFYo3OS-Rw6AGZ4h476pnAA",
  authDomain: "scratch-tutorials-45392.firebaseapp.com",
  databaseURL: "https://scratch-tutorials-45392-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scratch-tutorials-45392",
  storageBucket: "scratch-tutorials-45392.appspot.com",
  messagingSenderId: "1078204108425",
  appId: "1:1078204108425:web:0eb49a016a7f31661f4058"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };