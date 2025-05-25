// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration from your console
const firebaseConfig = {
  apiKey: "AIzaSyAqXEWJTDsjPerDF08lgtuTBiIFPGZpOmw",
  authDomain: "blog-platform-mittarv.firebaseapp.com",
  projectId: "blog-platform-mittarv",
  storageBucket: "blog-platform-mittarv.firebasestorage.app",
  messagingSenderId: "152218391659",
  appId: "1:152218391659:web:75e16280ef407461960d2e",
  measurementId: "G-8P2JR7FJ78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
