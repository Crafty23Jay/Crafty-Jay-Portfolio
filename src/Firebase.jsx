// src/firebase.jsx

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIYzJskcZEckmYcea6CYuiPJwwsg4Meso",
  authDomain: "craftyjay-portfolio.firebaseapp.com",
  projectId: "craftyjay-portfolio",
  storageBucket: "craftyjay-portfolio.appspot.com",
  messagingSenderId: "906564071459",
  appId: "1:906564071459:web:6e06136fb9eb8326768196",
  measurementId: "G-93N605F6L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
