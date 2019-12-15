import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "",
    authDomain: "think-piece-fd529.firebaseapp.com",
    databaseURL: "https://think-piece-fd529.firebaseio.com",
    projectId: "think-piece-fd529",
    storageBucket: "think-piece-fd529.appspot.com",
    messagingSenderId: "110608825728",
    appId: "1:110608825728:web:23547459a0c5f5be59d565",
    measurementId: "G-T8NBK3H96M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export const firestore = firebase.firestore();
  export const auth = firebase.auth();

  //authorization provider
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  window.firebase = firebase;

  export default firebase;