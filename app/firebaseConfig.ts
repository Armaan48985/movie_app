import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAlFL2uqS7Gd4NAfIG8lYoTlZfQwk1IDe4",
  authDomain: "movie-app-8f2a5.firebaseapp.com",
  projectId: "movie-app-8f2a5",
  storageBucket: "movie-app-8f2a5.appspot.com",
  messagingSenderId: "766879516854",
  appId: "1:766879516854:web:bd48ec7831cf5ac72b3e17",
  measurementId: "G-BN9QW72498"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}