// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4djqU0eV8Q8Vzyq8RkL0spUxeqyJZBVY",
    authDomain: "pasesapp-d01af.firebaseapp.com",
    projectId: "pasesapp-d01af",
    storageBucket: "pasesapp-d01af.appspot.com",
    messagingSenderId: "807054720009",
    appId: "1:807054720009:web:e0336eab365c2fa8340cd8",
    measurementId: "G-H72B0Q47DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)