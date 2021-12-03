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


const FIRST_LIMIT = 6;
const LOAD_MORE_LIMIT = 3;

type HomePageProps = {
	posts: Post[];
	postEnd: boolean;
};

export async function getServerSideProps() {
	const posts = await getAllPosts(FIRST_LIMIT)
	let postEnd = false;

	if (posts.length < FIRST_LIMIT) {
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

		const newPosts = await getMorePosts(LOAD_MORE_LIMIT, cursor);
		
		toast.success("Successfully loaded more posts");
		setPosts(posts.concat(newPosts));
		setLoading(false);

		if (newPosts.length < LOAD_MORE_LIMIT) {
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
