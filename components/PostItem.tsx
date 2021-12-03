import Link from "next/link";
import { Post } from "../models/Post";

type PostItemProps = {
	post: Post;
	admin: boolean;
};

export default function PostItem({ post, admin }: PostItemProps) {
	return (
		<div className="card post-card">
			<Link href={`/${post.email}/${post.slug}`}>
				<h2>
					<a>{post.title}</a>
				</h2>
			</Link>

			<footer>
				<span className="push-left">
					{post.heartCount || 0} Votes
				</span>
			</footer>

			{/* If admin view, show extra controls for user */}
			{admin && (
				<>
					<Link href={`/admin/${post.slug}`}>
						<h3>
							<button className="btn-blue">Edit</button>
						</h3>
					</Link>

					{post.published ? (
						<p className="text-success">Live</p>
					) : (
						<p className="text-danger">Unpublished</p>
					)}
				</>
			)}
		</div>
	);
}
