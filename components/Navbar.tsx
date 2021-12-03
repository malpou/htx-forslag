import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import SignOutButton from "./SignOutButton";

type NavbarProps = {};

export default function Navbar({}: NavbarProps) {
	const { user, username } = useContext(UserContext);

	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link href="/">
						<button className="btn-logo">HTX Forslag</button>
					</Link>
				</li>

				{/* user is signed-in and has username */}
				{username && (
					<>
						<li className="push-left">
							<Link href="/admin">
								<button className="btn-blue">
									Write Posts
								</button>
							</Link>
						</li>
						<li>
							<SignOutButton />
						</li>
						<li>
							<Link href={`/${username}`}>
								<img src={user?.photoURL} />
							</Link>
						</li>
					</>
				)}

				{/* user is not signed OR has not created username */}
				{!username && (
					<li>
						<Link href="/enter">
							<button id="btn-login" className="btn-blue">Login</button>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}
