// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multicore-ai.firebaseapp.com",
  projectId: "multicore-ai",
  storageBucket: "multicore-ai.firebasestorage.app",
  messagingSenderId: "1048401133858",
  appId: "1:1048401133858:web:88648c36a9e92b54ede57b",
  measurementId: "G-XMPXW0JTM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
// const analytics = getAnalytics(app);