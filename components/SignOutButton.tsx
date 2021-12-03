import { auth } from "../lib/firebase";

/** Sign out button */
export default function SignOutButton({}) {
	return <button className="btn-signout" onClick={() => auth.signOut()}>Sign out</button>;
}
