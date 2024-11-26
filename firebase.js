// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZlR2OW7q1cz4KYy_jV-JKxdQvSAGgy8c",
  authDomain: "resturent-fa137.firebaseapp.com",
  projectId: "resturent-fa137",
  storageBucket: "resturent-fa137.firebasestorage.app",
  messagingSenderId: "290275903980",
  appId: "1:290275903980:web:ff1290a137a065390f98c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
export {db}