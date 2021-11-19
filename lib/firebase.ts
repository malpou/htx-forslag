// TODO Migrate to firebase version 9
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
	apiKey: "AIzaSyA4qhVo9mDIwFLPFGe_9j5X4UXjYV8-GYs",
	authDomain: "htx-borgerforslag.firebaseapp.com",
	projectId: "htx-borgerforslag",
	storageBucket: "htx-borgerforslag.appspot.com",
	messagingSenderId: "923302169514",
	appId: "1:923302169514:web:0de11032c1a5b7bafb79d3",
	measurementId: "G-4TGW969SBE",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
