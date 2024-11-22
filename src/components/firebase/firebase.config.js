// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_Oy7H58Hcs1VulrF9WccVf_eIIfg_dYs",
  authDomain: "discount-pro-80447.firebaseapp.com",
  projectId: "discount-pro-80447",
  storageBucket: "discount-pro-80447.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "80392616714",
  appId: "1:80392616714:web:197adaaee01bb0116058f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;