import { doc } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { writeBatch } from "firebase/firestore";
import { auth, firestore, emailCol, usersCol } from "../lib/firebase";


export async function createUser(email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = doc(usersCol, user.uid);
        const emailRef = doc(emailCol, user.email);


        const batch = writeBatch(firestore);
        batch.set(userRef, {
            email: user.email,
        });
        batch.set(emailRef, { userId: user.uid });

        batch.commit();

        return user;

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return { errorCode, errorMessage };
    }
}


export async function login(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return { errorCode, errorMessage };
    }
}