import { Timestamp } from "firebase/firestore";

export type Post = {
	title: string;
	slug: string;
	uid: string;
	email: string;
	published: boolean;
	content: string;
	createdAt: string;
	updatedAt: string;
	heartCount: number;
};
