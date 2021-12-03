import Link from "next/link";
import { Post } from "../models/Post";

type PostItemProps = {
	post: Post;
	admin: boolean;
};

export default function PostItem({ post, admin }: PostItemProps) {
	const wordCount = post.content.trim().split(/\s+/).length;
	const minutesToRead = (wordCount / 100 + 1).toFixed(0);

	return (
		<div className="card">
			<Link href={`/${post.email}`}>
				<a>
					<strong>By @{post.email}</strong>
				</a>
			</Link>

			<Link href={`/${post.email}/${post.slug}`}>
				<h2>
					<a>{post.title}</a>
				</h2>
			</Link>

			<footer>
				<span>
					{wordCount} words. {minutesToRead} min read
				</span>
				<span className="push-left">
					💗 {post.heartCount || 0} Hearts
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
