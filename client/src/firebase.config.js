// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAT4HPPtKvZWIKNHf1aMOzhcvbcYKzPAes",
    authDomain: "gowheels-b0d13.firebaseapp.com",
    projectId: "gowheels-b0d13",
    storageBucket: "gowheels-b0d13.appspot.com",
    messagingSenderId: "844083066064",
    appId: "1:844083066064:web:eaef3b2a88c01e39ea5ad5",
    measurementId: "G-3VNPS7GGB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);