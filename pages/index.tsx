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
import { getAllPosts, getMorePosts } from "../services/postService";


const LIMIT = 6;

type HomePageProps = {
	posts: Post[];
	postEnd: boolean;
};

export async function getServerSideProps() {
	const posts = await getAllPosts(LIMIT)
	let postEnd = false;

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

	const loadMore = async () => {
		setLoading(true);

		const last = posts[posts.length - 1];
		const cursor = last.createdAt;

		const newPosts = await getMorePosts(LIMIT, cursor);
		
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
				<button onClick={loadMore}>Load more</button>
			)}

			<Loader show={loading} />

			{postsEnd && <p>No more posts</p>}
		</main>
	);
}
