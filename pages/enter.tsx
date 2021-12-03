import SignOutButton from "../components/SignOutButton";
import SignInButton from "../components/SignInButton";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import AuthForm from "../components/AuthForm";

export default function EnterPage({ }) {
	const { user, email } = useContext(UserContext);


	return (
		<main>
			{user ? <SignOutButton /> : <AuthForm />}
		</main>
	);
}
