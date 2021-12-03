import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, usersCol } from "../lib/firebase";

export function useUserData() {
	//TODO Fix this TS error
	const [user] = useAuthState(auth);
	const [email, setEmail] = useState(null);

	useEffect(() => {
		// turn off realtime subscription
		let unsubscribe;

		if (user) {
			const ref = doc(usersCol, user.uid);
			unsubscribe = onSnapshot(ref, (doc) => {
				setEmail(doc.data()?.email);
			});
		} else setEmail(null);

		return unsubscribe;
	}, [user]);

	return { user, email };
}
