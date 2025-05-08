// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsffh87Vw4R0ighMOQxrMiWZtdm5PzLb8",
  authDomain: "avicontrolbanco.firebaseapp.com",
  databaseURL: "https://avicontrolbanco-default-rtdb.firebaseio.com",
  projectId: "avicontrolbanco",
  storageBucket: "avicontrolbanco.firebasestorage.app",
  messagingSenderId: "746324791023",
  appId: "1:746324791023:web:3cdec380091db1a438551a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
export { signInWithEmailAndPassword };