import { getDocs, limit, orderBy, query, where } from "@firebase/firestore";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { userPostsCol } from "../../lib/firebase";
import { Post } from "../../models/Post";
import { User } from "../../models/User";
import { getUserWithUsername } from "../../utils/firebaseHelper";

type UserProfilePageProps = {
	posts: Post[];
	user: User;
};

export async function getServerSideProps({ query: params }) {
	const { username } = params;

	const userDoc = await getUserWithUsername(username);

	if (!userDoc) {
		return {
			notFound: true,
		};
	}

	let user: User | null = null;
	let posts: Post[] = [];
	if (userDoc) {
		user = userDoc.data();
		const postsQuery = query(
			userPostsCol(userDoc.id),
			where("published", "==", true),
			limit(5)
		);
		(await getDocs(postsQuery)).forEach((doc) => {
			const data = doc.data();
			posts.push(data);
		});
	}

	return {
		props: { user, posts },
	};
}

export default function UserProfilePage({ posts, user }: UserProfilePageProps) {
	return (
		<main>
			<UserProfile user={user} />
			<PostFeed posts={posts} admin={false} />
		</main>
	);
}
