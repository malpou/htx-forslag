import { Post } from "../models/Post";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type PostContentProps = {
	post: Post;
};

export default function PostContent({ post }: PostContentProps) {
	const createdAt = new Date(post.createdAt);

	return (
		<div className="card">
			<h1>{post.title}</h1>
			<span className="text-sm">
				Written by{" "}
				<Link href={`/${post.email}`}>
					<a className="text-info">{post.email}</a>
				</Link>{" "}
				on {createdAt.toDateString()}
			</span>
			<ReactMarkdown>{post.content}</ReactMarkdown>
		</div>
	);
}
