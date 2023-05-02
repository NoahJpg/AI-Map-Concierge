import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const apiKey = process.env.FIREBASE_CONFIG

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "ai-map-concierge.firebaseapp.com",
  projectId: "ai-map-concierge",
  storageBucket: "ai-map-concierge.appspot.com",
  messagingSenderId: "1040221752912",
  appId: "1:1040221752912:web:e7e2630e91bff461c5cb55",
  measurementId: "G-S1J3F633SC"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();