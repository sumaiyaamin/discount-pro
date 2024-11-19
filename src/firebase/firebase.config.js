// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXX6RZtuLes-ZUVRm8b0Jy3rsCK-waIak",
  authDomain: "dental-teeth-cd122.firebaseapp.com",
  projectId: "dental-teeth-cd122",
  storageBucket: "dental-teeth-cd122.firebasestorage.app",
  messagingSenderId: "506434617953",
  appId: "1:506434617953:web:91feed14e44c619fa5e020"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;