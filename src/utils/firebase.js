import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyAbH6L2x-yj-V5OqBSq92jFgBoRIEfAD7k",
  authDomain: "meebits-1653f.firebaseapp.com",
  projectId: "meebits-1653f",
  storageBucket: "meebits-1653f.appspot.com",
  messagingSenderId: "677776366261",
  appId: "1:677776366261:web:23292c46db2f0b1dd5bcfc",
  measurementId: "G-YWHKMKDC8S",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firestoreRef = firebase.firestore();
const firebaseStorageRef = firebase.storage();

export { firestoreRef, firebaseStorageRef };
