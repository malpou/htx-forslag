import { useContext } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";

export default function AuthCheck(props) {
	const { username } = useContext(UserContext);

	return username
		? props.children
		: props.fallback || (
				<Link href="/enter">
					<button>You must be signed in</button>
				</Link>
		  );
}
