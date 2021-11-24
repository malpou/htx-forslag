// Helper functions

import {
	collection,
	collectionGroup,
	CollectionReference,
	doc,
	DocumentData,
	getDoc,
} from "firebase/firestore";
import { firestore, usernamesCol, usersCol } from "../lib/firebase";

/** Gets a users/{uid} document with username */
export async function getUserWithUsername(username: string) {
	const usernameDocRef = doc(usernamesCol, username);
	const usernameDoc = await getDoc(usernameDocRef);
	if (!usernameDoc.data()) {
		return null;
	}
	const userDocRef = doc(usersCol, usernameDoc.data().userId);
	const userDoc = await getDoc(userDocRef);
	return userDoc;
}

/** Converts a firestore document to JSON */
export function postToJSON(doc) {
	const data = doc.data();
	return {
		...data,
		createdAt: data.createdAt.toMillis(),
		updatedAt: data.updatedAt.toMillis(),
	};
}

// This is just a helper to add the type to the db responses
export function createCollection<T = DocumentData>(collectionName: string) {
	return collection(firestore, collectionName) as CollectionReference<T>;
}

export function createCollectionGroup<T = DocumentData>(
	collectionName: string
) {
	return collectionGroup(firestore, collectionName) as CollectionReference<T>;
}
