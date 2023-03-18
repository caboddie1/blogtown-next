import React from 'react';
import { collection, doc, getDoc, getDocs, DocumentData, where, orderBy, query, QuerySnapshot, Query } from 'firebase/firestore';

import { db } from '../firebase';
import type { Blog, Tag } from '@/components/blog/types';

interface Fetch {
    status: number;
    error: string;
}

export interface FetchBlogs extends Fetch {
    data: Blog[];
}

interface FetchBlog extends Fetch {
    data: Blog;
}

interface FetchTag extends Fetch {
    data: Tag[];
}

interface FetchGeneric<T> extends Fetch {
    data: T;
}

type FireBaseRequest = (query: Query<DocumentData>) => Promise<QuerySnapshot<DocumentData>>;

export default function useFetchBlogs() {

    const blogCollectionRef = collection(db, 'blogs');
    const tagCollectionRef = collection(db, 'tags');

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

    const getBlogs = async (): Promise<FetchBlogs> => {
        try {
            const data = await getDocs(blogCollectionRef);
            return { 
                data: (data.docs.map((doc: DocumentData) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })),
            status: 200,
            error: ''
        }
        } catch(e) {
            return {
                error: String(e),
                status: 400,
                data: []
            }
        }
    }

    interface PublishedArgs {
        published: boolean;
        category?: string;
    }

    const getBlogsPublished = async ({ published, category }: PublishedArgs): Promise<FetchBlogs> => {

        const shouldFetchAll: boolean = (!category || category === 'all');

        const queries = [
            where('published', '==', published),
            ...(!shouldFetchAll ? [where('category.id', '==', category)] : [])
        ]

        const q = query(blogCollectionRef, ...queries, orderBy('created', 'desc'))
        return handleFetchReturn(q);
    }

    const getBlog = async (id: string): Promise<FetchBlog> => {

        const blogRef = doc(db, 'blogs', id);
        const docSnap = await getDoc<any>(blogRef);

        if(docSnap.exists()) {
            return {
                data: {
                    ...docSnap.data(),
                    id: docSnap.id,
                },
                status: 200,
                error: ''
            }
        } else {
            return { 
                error: 'Error - unable to find blog',
                status: 400,
                data: {} as Blog
            };
        }
    }

    const getTags = async (): Promise<FetchTag> => {
        try {
            const data = await getDocs(tagCollectionRef);
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

    const getIsAdmin = async(uid: string): Promise<boolean> => {
        const adminRef = doc(db, 'admins', uid);
        const document = await getDoc(adminRef);
        return document.exists();
    }


    return {
        getBlogs,
        getBlogsPublished,
        getBlog,
        getTags,
        getIsAdmin,
    };

}