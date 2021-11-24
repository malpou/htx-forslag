import { orderBy, query } from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, userPostsCol } from "../lib/firebase";
import PostFeed from "./PostFeed";

export default function PostList() {
	const ref = userPostsCol(auth.currentUser!.uid);
	const q = query(ref, orderBy("createdAt", "desc"));
	const [querySnapshop] = useCollection(q);

	const posts = querySnapshop?.docs.map((doc) => doc.data());

	return (
		<>
			<h1>Manage your Posts</h1>
			<PostFeed posts={posts} admin />
		</>
	);
}
