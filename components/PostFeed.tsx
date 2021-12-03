import { Post } from "../models/Post";
import PostItem from "./PostItem";

type PostFeedProps = {
	posts: Post[];
	admin?: boolean;
};

export default function PostFeed({ posts, admin }: PostFeedProps) {
	return (
		<div className="post-container">
			{posts
				? posts.map((post) => (
						<PostItem post={post} key={post.slug} admin={admin} />
				  ))
				: null}
		</div>
	);
}
