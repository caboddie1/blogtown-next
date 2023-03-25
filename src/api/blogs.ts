import { db } from "@/firebase";
import { FetchBlogs } from "@/hooks/getBlogs";
import { where, query, orderBy, collection, getDocs, DocumentData, Query } from "firebase/firestore";

const blogCollectionRef = collection(db, 'blogs');


interface PublishedArgs {
    published: boolean;
    category?: string;
}

async function handleFetchReturn<T>(query: Query<DocumentData>) {
    try {
        const data = await getDocs(query);
        return {
            data: (data.docs.map((doc: DocumentData) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                } 
        })),
        error: '',
        status: 200
    }
    } catch(e) {
        return {
            error: String(e),
            status: 400,
            data: []
        }
    }
}

export const getBlogsPublished = async ({ published, category }: PublishedArgs): Promise<FetchBlogs> => {

    const shouldFetchAll: boolean = (!category || category === 'all');

    const queries = [
        where('published', '==', published),
        ...(!shouldFetchAll ? [where('category.id', '==', category)] : [])
    ]

    const q = query(blogCollectionRef, ...queries, orderBy('created', 'desc'))
    return handleFetchReturn(q);
}

export const getBlogByUrl = async (url: string): Promise<FetchBlogs> => {
    const q = where('url', '==', url);

    const result = query(blogCollectionRef, q, orderBy('created', 'desc'))

    return handleFetchReturn(result)

}