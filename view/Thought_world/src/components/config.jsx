// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8T7Zebr92S-nVZZzTg2RTAEI4EP7Yqyg",
  authDomain: "yourthoughts-39d46.firebaseapp.com",
  projectId: "yourthoughts-39d46",
  storageBucket: "yourthoughts-39d46.appspot.com",
  messagingSenderId: "1018378078547",
  appId: "1:1018378078547:web:673b135a97edb9aa0439a6",
  measurementId: "G-68BXW9JLLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);