import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtfHfc1a2ySX0kh-XvDCfBnR2quqhkMD0",
    authDomain: "apoorv-cab-booking.firebaseapp.com",
    projectId: "apoorv-cab-booking",
    storageBucket: "apoorv-cab-booking.firebasestorage.app",
    messagingSenderId: "716598123326",
    appId: "1:716598123326:web:aad235467306547c422a6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = typeof window !== "undefined" ? getAuth(app) : null;