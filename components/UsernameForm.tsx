import { doc, getDoc, writeBatch } from "firebase/firestore";
import debounce from "lodash.debounce";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { firestore, usernamesCol, usersCol } from "../lib/firebase";
import UsernameMessage from "./UsernameMessage";

/** Username form */
export default function UsernameForm({}) {
	const [formValue, setFormValue] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const { user, username } = useContext(UserContext);

	const onSubmit = async (e) => {
		e.preventDefault();

		// Create refs for both documents
		const userRef = doc(usersCol, user.uid);
		const usernameRef = doc(usernamesCol, formValue);

		const batch = writeBatch(firestore);
		batch.set(userRef, {
			username: formValue,
			photoUrl: user.photoURL,
			displayName: user.displayName,
		});
		batch.set(usernameRef, { userId: user.uid });

		await batch.commit();
	};

	const onChange = (e) => {
		// Force form value typed in form to match correct format
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		// Only set form value if length is < 3 OR it passes regex
		if (val.length < 3) {
			setFormValue(val);
			setLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setLoading(true);
			setIsValid(false);
		}
	};

	useEffect(() => {
		checkUsername(formValue);
	}, [formValue]);

	const checkUsername = useCallback(
		debounce(async (username: string) => {
			if (username.length >= 3) {
				const ref = doc(usernamesCol, username);
				const exists = await (await getDoc(ref)).exists();
				setIsValid(!exists);
				setLoading(false);
			}
		}, 500),
		[]
	);

	return (
		!username && (
			<section>
				<h3>Choose Username</h3>
				<form onSubmit={onSubmit}>
					<input
						name="username"
						placeholder="username"
						value={formValue}
						onChange={onChange}
					/>
					<UsernameMessage
						username={formValue}
						isValid={isValid}
						loading={loading}
					/>

					<button
						type="submit"
						className="btn-green"
						disabled={!isValid}
					>
						Choose
					</button>

					<h3>Debug State</h3>
					<div>
						Username: {formValue}
						<br />
						Loading: {loading.toString()}
						<br />
						Username Valid: {isValid.toString()}
					</div>
				</form>
			</section>
		)
	);
}
