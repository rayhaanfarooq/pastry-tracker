// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvc1hofH5fySUrJCMLP5TnH02s1YgIRzM",
  authDomain: "pantry-tracker-e92bb.firebaseapp.com",
  projectId: "pantry-tracker-e92bb",
  storageBucket: "pantry-tracker-e92bb.appspot.com",
  messagingSenderId: "377530395873",
  appId: "1:377530395873:web:6faa96b32d09380d085ba0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);