import { auth, googleAuthProvider } from "../lib/firebase";

/** Sign in with Google button */
export default function SignInButton({}) {
	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleAuthProvider);
	};

	return (
		<button className="btn-google" onClick={signInWithGoogle}>
			<img src={"/google.png"} />
			Sign in with Google
		</button>
	);
}
