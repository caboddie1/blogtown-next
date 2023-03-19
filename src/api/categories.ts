import { collection, DocumentData, getDocs } from "@firebase/firestore";

import { db } from "@/firebase";
import { Category } from "@/components/blog/categories/types";

export interface FetchCategories {
    data: Category[];
    status: number;
    error: string;
}

export async function getCategories(): Promise<FetchCategories> {
    const categoryCollectionRef = collection(db, 'categories');
    try {
        const data = await getDocs(categoryCollectionRef);
        return {
            data: (data.docs.map((doc: DocumentData) => {
            return {
                id: doc.id,
                ...doc.data(),
            }
            })),
            status: 200,
            error: '',
        }
    } catch(e) {
        return {
            error: String(e),
            status: 400,
            data: []
        }
    }
}