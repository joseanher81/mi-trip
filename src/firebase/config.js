// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBglM25inpQxSOdOIGl1pfIUWCn4Tmrkgc",
  authDomain: "mytrip-950f2.firebaseapp.com",
  projectId: "mytrip-950f2",
  storageBucket: "mytrip-950f2.appspot.com",
  messagingSenderId: "131382520493",
  appId: "1:131382520493:web:e561caf8f8d50e9ee0b424",
  measurementId: "G-X443468QLR"
};

// Initialize Firebase
export const firebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( firebaseApp );
export const FirebaseDB = getFirestore( firebaseApp );
export const analytics = getAnalytics( firebaseApp );