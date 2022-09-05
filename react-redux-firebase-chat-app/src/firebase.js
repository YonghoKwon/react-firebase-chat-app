import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBZooInpw9dvQ_qg-seazvM-2K3bAfUAV8",
    authDomain: "react-redux-firebase-cha-1a50f.firebaseapp.com",
    projectId: "react-redux-firebase-cha-1a50f",
    storageBucket: "react-redux-firebase-cha-1a50f.appspot.com",
    messagingSenderId: "967222648992",
    appId: "1:967222648992:web:affe50e93964914ba7e9c5",
    measurementId: "G-GZYPVZLGSX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();