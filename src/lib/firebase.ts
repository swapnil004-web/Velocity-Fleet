import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJE_Lhl_UBdxh0jyOcl5fRIDfDNuRt9FE",
  authDomain: "velocity-fleet.firebaseapp.com",
  projectId: "velocity-fleet",
  storageBucket: "velocity-fleet.firebasestorage.app",
  messagingSenderId: "1085777509165",
  appId: "1:1085777509165:web:6bab8393c1bc8341ff31a4"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
