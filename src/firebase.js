import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhLf0JUn_8hDfayUhxVee1flSzP00PfD4",
  authDomain: "clone-e0539.firebaseapp.com",
  projectId: "clone-e0539",
  storageBucket: "clone-e0539.appspot.com",
  messagingSenderId: "975289085972",
  appId: "1:975289085972:web:bcdb3b971f5af42cf23701",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
