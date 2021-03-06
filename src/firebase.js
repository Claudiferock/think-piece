import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAJctHlfeInRkqD624bbpNej9AXjv8NB-g",
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
  export const signOutWithGoogle = () => auth.signOut();

  window.firebase = firebase;

  export const createUserProfileDocument = async (user, additionalData) => {
    if (!user) return;

    // Get a reference to the place in the db where a user profile might be.
    const userRef = firestore.doc(`users/${user.uid}`);

    // Go and fetch the document from that location
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.error('Error creating user', error.message);
      }
    }

    return getUserDocument(user.uid);
  };

  export const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      // the collection we use is users and the doc will be the uid
      return firestore.collection('users').doc(uid);
      //GONE .get();
      //GONE return { uid, ...userDocument.data() };
    } catch (error) {
      console.error('Error fetching user', error.message);
      
    }
  }

  export default firebase;