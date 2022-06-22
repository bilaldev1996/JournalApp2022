// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBY81i4L_KyQHqfzZSzzXV3UcYw2vfERIs",
    authDomain: "react-cursos-1a064.firebaseapp.com",
    projectId: "react-cursos-1a064",
    storageBucket: "react-cursos-1a064.appspot.com",
    messagingSenderId: "209088829477",
    appId: "1:209088829477:web:26e2d3dd115706d0e6c7cc"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);