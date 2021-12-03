// TODO Migrate to firebase version 9
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Post } from "../models/Post";
// Import all your model types
import { User } from "../models/User";
import { Email } from "../models/Email";
import {
	createCollection,
	createCollectionGroup,
} from "../utils/firebaseHelper";
import { serverTimestamp, increment } from "firebase/firestore";

// Init the firebase app
export const firebaseApp = initializeApp({
	apiKey: "AIzaSyA4qhVo9mDIwFLPFGe_9j5X4UXjYV8-GYs",
	authDomain: "htx-borgerforslag.firebaseapp.com",
	projectId: "htx-borgerforslag",
	storageBucket: "htx-borgerforslag.appspot.com",
	messagingSenderId: "923302169514",
	appId: "1:923302169514:web:0de11032c1a5b7bafb79d3",
	measurementId: "G-4TGW969SBE",
});

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore();
export const storager = getStorage();
export const timestamp = serverTimestamp();
export const incrementByOne = increment(1);

// export all your collections
export const usersCol = createCollection<User>("users");
export const emailCol = createCollection<Email>("usernames");
export const userPostsCol = (userId: string) =>
	createCollection<Post>(`users/${userId}/posts`);
export const postsCol = createCollectionGroup<Post>("posts");
