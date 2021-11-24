import { DocumentReference, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Post } from "../models/Post";
import styles from "../styles/Admin.module.css";

type PostFormProbs = {
	postRef: DocumentReference<Post>;
	defaultValues: Post;
	preview: boolean;
};

export default function PostForm({
	defaultValues,
	postRef,
	preview,
}: PostFormProbs) {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty, isValid },
	} = useForm({ defaultValues, mode: "onChange" });

	const updatePost = async ({ content, published }) => {
		await updateDoc(postRef, {
			content,
			published,
			updatedAt: new Date().toISOString(),
		});

		reset({ content, published });

		toast.success("Post updated!");
	};

	return (
		<form onSubmit={handleSubmit(updatePost)}>
			{preview && (
				<div className="card">
					<ReactMarkdown>{watch("content")}</ReactMarkdown>
				</div>
			)}

			<div className={preview ? styles.hidden : styles.controls}>
				<textarea
					name="content"
					{...register("content", {
						maxLength: {
							value: 20000,
							message: "content is too long",
						},
						minLength: {
							value: 50,
							message: "content is too short",
						},
						required: {
							value: true,
							message: "content is required",
						},
					})}
				/>
				{errors.content && (
					<p className="text-danger">{errors.content.message}</p>
				)}
				<fieldset>
					<input
						className={styles.checkbox}
						name="published"
						type="checkbox"
						{...register("published")}
					/>
					<label>Published</label>
				</fieldset>
				<button
					type="submit"
					className="btn-green"
					disabled={!isDirty || !isValid}
				>
					Save Changes
				</button>
			</div>
		</form>
	);
}
