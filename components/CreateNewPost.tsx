import { useRouter } from "next/dist/client/router";
import styles from "../styles/Admin.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import kebabCase from "lodash.kebabcase";
import { auth, firestore, timestamp, userPostsCol } from "../lib/firebase";
import { doc, writeBatch } from "firebase/firestore";
import toast from "react-hot-toast";

type CreateNewPostProps = {};

export default function CreateNewPost({}: CreateNewPostProps) {
	const router = useRouter();
	const { email } = useContext(UserContext);
	const [title, setTitle] = useState("");

	// Ensure slug is url safe
	const slug = encodeURI(kebabCase(title));

	// validate title length
	const isValid = title.length > 3 && title.length < 100;

	const createPost = async (e) => {
		e.preventDefault();
		const uid = auth.currentUser.uid;
		const ref = doc(userPostsCol(uid), slug);

		const data = {
			title,
			slug,
			uid,
			email,
			published: false,
			content: "No content on the post",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			heartCount: 0,
		};

		const batch = writeBatch(firestore);
		batch.set(ref, data);
		await batch.commit();
		toast.success("Post created successfully!");
		router.push(`/admin/${slug}`);
	};

	return (
		<>
			<h1>Add a new Post</h1>
			<form onSubmit={createPost}>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="My Awesome Article!"
					className={styles.input}
				/>
				<p>
					<strong>Slug: </strong>
					{slug}
				</p>
				<button type="submit" disabled={!isValid} className="btn-green">
					Create New Post
				</button>
			</form>
		</>
	);
}
