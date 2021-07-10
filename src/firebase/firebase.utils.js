import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD61SB2GoWOzEEUFSxXpNM4aNGbCmI-Pn8",
  authDomain: "crwn-db-fbe6c.firebaseapp.com",
  projectId: "crwn-db-fbe6c",
  storageBucket: "crwn-db-fbe6c.appspot.com",
  messagingSenderId: "935905226604",
  appId: "1:935905226604:web:f464a6697429b75a328d49",
  measurementId: "G-NBKC6H486Q",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
