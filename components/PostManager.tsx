import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import {
	useDocumentData,
	useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { auth, userPostsCol } from "../lib/firebase";
import styles from "../styles/Admin.module.css";
import PostForm from "./PostForm";
import Link from "next/link";

type PostManagerProps = {};

export default function PostManager({}: PostManagerProps) {
	const [preview, setPreview] = useState(false);

	const router = useRouter();
	const { slug } = router.query;

	const postRef = userPostsCol(auth.currentUser!.uid);
	const document = doc(postRef, slug as string);
	const [post] = useDocumentDataOnce(document);

	return (
		<main className={styles.container}>
			{post && (
				<>
					<section>
						<h1>{post.title}</h1>
						<p>ID: {post.slug}</p>
						<PostForm
							postRef={document}
							defaultValues={post}
							preview={preview}
						/>
					</section>

					<aside>
						<h3>Tools</h3>
						<button onClick={() => setPreview(!preview)}>
							{preview ? "Edit" : "Preview"}{" "}
						</button>
						<Link href={`/${post.username}/${post.slug}`}>
							<button className="btn-blue">Live view</button>
						</Link>
					</aside>
				</>
			)}
		</main>
	);
}
