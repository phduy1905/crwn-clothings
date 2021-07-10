import firebase from "firebase";
import "firebase/firebase";

const firestore = firebase.firestore();

firestore
  .collection("users")
  .doc("U79L5eUPswU6K2lgshdh")
  .collection("cartItems")
  .doc("UB3Zhek8K9RlbPdGISsW");

firestore.doc("/users/U79L5eUPswU6K2lgshdh/cartItems/UB3Zhek8K9RlbPdGISsW");
