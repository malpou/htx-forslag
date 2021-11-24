import {
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	Timestamp,
	where,
} from "firebase/firestore";
import { postsCol } from "../lib/firebase";
import { Post } from "../models/Post";
import PostFeed from "../components/PostFeed";
import { useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const LIMIT = 2;

type HomePageProps = {
	posts: Post[];
	postEnd: boolean;
};

export async function getServerSideProps() {
	const posts: Post[] = [];
	let postEnd = false;

	const q = query(
		postsCol,
		where("published", "==", true),
		orderBy("createdAt", "desc"),
		limit(LIMIT)
	);

	(await getDocs(q)).forEach((doc) => {
		const data = doc.data();
		posts.push(data);
	});

	if (posts.length < LIMIT) {
		postEnd = true;
	}

	return {
		props: { posts, postEnd },
	};
}

export default function HomePage(props: HomePageProps) {
	const [posts, setPosts] = useState(props.posts);
	const [loading, setLoading] = useState(false);
	const [postsEnd, setPostsEnd] = useState(props.postEnd);

	const getMorePosts = async () => {
		const newPosts: Post[] = [];

		setLoading(true);

		const last = posts[posts.length - 1];
		const cursor =
			typeof last.createdAt === "number"
				? Timestamp.fromMillis(last.createdAt)
				: last.createdAt;

		const q = query(
			postsCol,
			where("published", "==", true),
			orderBy("createdAt", "desc"),
			startAfter(cursor),
			limit(LIMIT)
		);

		(await getDocs(q)).forEach((doc) => {
			const data = doc.data();
			newPosts.push(data);
		});

		toast.success("Successfully loaded more posts");
		setPosts(posts.concat(newPosts));
		setLoading(false);

		if (newPosts.length < LIMIT) {
			setPostsEnd(true);
		}
	};

	return (
		<main>
			<PostFeed posts={posts} />

			{!loading && !postsEnd && (
				<button onClick={getMorePosts}>Load more</button>
			)}

			<Loader show={loading} />

			{postsEnd && <p>No more posts</p>}
		</main>
	);
}
