import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { Category } from '@/components/blog/categories/types';
import { db } from '../firebase';

interface FetchCategories {
    data: Category[];
    status: number;
    error: string;
}

export default function useCategories() {

    const [state, setState] = useState<FetchCategories | undefined>()

    const categoryCollectionRef = collection(db, 'categories');

    const getCategories = async (): Promise<FetchCategories> => {
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

    useEffect(() => {
        (async () => {
            const data = await getCategories();
            setState(data);
        })();
    });

    const isLoading = useMemo(() => {
        return state === undefined;
    }, [state]);

    return { state, isLoading };
}