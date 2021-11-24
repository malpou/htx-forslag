import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../lib/firebase";

/** Sign in with Google button */
export default function SignInButton({}) {
	const signInWithGoogle = async () => {
		await signInWithPopup(auth, googleAuthProvider);
	};

	return (
		<button className="btn-google" onClick={signInWithGoogle}>
			<img src={"/google.png"} />
			Sign in with Google
		</button>
	);
}
