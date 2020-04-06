import firebase from "firebase/app";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it

const clientCredentials = {
    apiKey: "AIzaSyAqTmCSxMpa8ChtctBr6OrRNbudOG6RX-U",
    authDomain: "nachotime-c52ff.firebaseapp.com",
    databaseURL: "https://nachotime-c52ff.firebaseio.com",
    projectId: "nachotime-c52ff",
    storageBucket: "nachotime-c52ff.appspot.com",
    messagingSenderId: "455353389293",
    appId: "1:455353389293:web:7222206f47ef4a33617ce4",
};

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
}

export default firebase;
