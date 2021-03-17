import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCGHKENlshz3wtPKTLHnrkThuJrFRQEFu8",
    authDomain: "studytogether-911cf.firebaseapp.com",
    projectId: "studytogether-911cf",
    storageBucket: "studytogether-911cf.appspot.com",
    messagingSenderId: "770527269719",
    appId: "1:770527269719:web:1f7d6455a8db228ba22412",
    measurementId: "G-7B5VQ2DZ1E"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database; 