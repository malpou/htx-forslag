import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { postsCol, userPostsCol } from "../../lib/firebase";
import { Post } from "../../models/Post";
import { getUserWithUsername } from "../../utils/firebaseHelper";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostContent from "../../components/PostContent";
import Metatags from "../../components/Metatags";
import styles from "../../styles/Post.module.css";

type UserPostPageProps = {
	post: Post;
	path: string;
};

export async function getStaticProps({ params }) {
	const { username, slug } = params;
	const userDoc = await getUserWithUsername(username);

	let post: Post;
	let path: string;

	if (userDoc) {
		const postRef = doc(userPostsCol(userDoc.ref.id), slug);
		const data = (await getDoc(postRef)).data();

		if (!data) {
			return {
				notFound: true,
			};
		}

		post = data;
		path = postRef.path;
	}

	return {
		props: { post, path },
		revalidate: 5000,
	};
}

export async function getStaticPaths() {
	const snapshot = await getDocs(
		query(postsCol, where("published", "==", true))
	);

	const paths = snapshot.docs.map((doc) => {
		const { slug, email } = doc.data();
		return {
			params: { email, slug },
		};
	});

	return { paths, fallback: "blocking" };
}

export default function PostPage(probs: UserPostPageProps) {
	const postRef = doc(userPostsCol(probs.post.uid), probs.post.slug);

	const [realtimePost] = useDocumentData(postRef);

	const post = realtimePost || probs.post;

	return (
		<main className={styles.container}>
			<Metatags title={post.title} description={post.content} />
			<section>
				<PostContent post={post} />
			</section>

			<aside className="card">
				<p>
					<strong>{post.heartCount || 0} ❤️</strong>
				</p>
			</aside>
		</main>
	);
}
