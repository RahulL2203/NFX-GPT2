// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQcaoVPleiTp89hHxyXtCvsYnqXaqy8O0",
  authDomain: "nf-gpt-9f11b.firebaseapp.com",
  projectId: "nf-gpt-9f11b",
  storageBucket: "nf-gpt-9f11b.appspot.com",
  messagingSenderId: "791473426474",
  appId: "1:791473426474:web:5b74c79e454ebcad927353",
  measurementId: "G-CG9B93PQ0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();