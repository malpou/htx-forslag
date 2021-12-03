import { query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { postsCol } from "../lib/firebase";
import { Post } from "../models/Post";

export async function getAllPosts(LIMIT: number): Promise<Post[]> {
    const posts: Post[] = [];
    const q = query(
        postsCol,
        where("published", "==", true),
        orderBy("createdAt", "desc"),
        limit(LIMIT)
    );

    (await getDocs(q)).forEach((doc) => {
        const data = doc.data();
        posts.push(data);
    });

    return posts;
}

export async function getMorePosts(LIMIT: number, cursor: string): Promise<Post[]> {
    const posts: Post[] = [];
    const q = query(
        postsCol,
        where("published", "==", true),
        orderBy("createdAt", "desc"),
        startAfter(cursor),
        limit(LIMIT)
    );

    (await getDocs(q)).forEach((doc) => {
        const data = doc.data();
        posts.push(data);
    });

    return posts;
    
}


