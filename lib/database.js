import "@firebase/firestore";
import firebase from "@firebase/app";

const config = {
    apiKey: "AIzaSyAqTmCSxMpa8ChtctBr6OrRNbudOG6RX-U",
    authDomain: "nachotime-c52ff.firebaseapp.com",
    databaseURL: "https://nachotime-c52ff.firebaseio.com",
    projectId: "nachotime-c52ff",
    storageBucket: "nachotime-c52ff.appspot.com",
    messagingSenderId: "455353389293",
    appId: "1:455353389293:web:7222206f47ef4a33617ce4",
};

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp(config);
} else {
    app = firebase.app();
}

const db = firebase.firestore(app);

export default db;
