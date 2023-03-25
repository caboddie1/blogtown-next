import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import queryString from 'query-string';
import { collection, doc, setDoc, DocumentReference } from 'firebase/firestore';
import { toast } from "react-toastify";

import { db } from '@/firebase';
import useFetchBlogs from "@/components/blog/hooks/getBlogs";
import { FirebaseBlogData, FirebaseBlogDataItem, FormState } from "@/components/blog/create/form/types";
import { formItems as _formItems } from "@/components/blog/create/form/formItems";
import { useAuth } from "@/contexts/authContext";
import { MultiValue } from "react-select";
import { NewTag, Tag } from "@/components/blog/types";



function parseDefaultValues(blog: FirebaseBlogData): FormState {
    return _formItems.reduce((prev, { name, input: { type } }) => {

        let value;
        const blogItem: FirebaseBlogDataItem = blog[name];

        switch(type) {
            case 'text':
                value = typeof blogItem === 'string' ? blogItem : ''
                break;
            case 'checkbox':
                value = typeof blogItem === 'boolean' ? blogItem : false;
                break;
            case 'multi':
                value = Array.isArray(blogItem) ? blogItem : [];
                break;
            case 'single':
                value = blogItem;
                break;
        }

        return {
            ...prev,
            [name]: {
                type,
                value
            }
        }
    }, {});
}

export default function useSaveBlog() {
    const [blogRef, setBlogRef] = useState<DocumentReference>();
    const [defaultValues, setDefaultValues] = useState<FormState | null | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [tags, setTags] = useState<MultiValue<Tag> | undefined>();
    const [blogCreateDate, setBlogCreateDate] = useState<string>(new Date().toISOString());

    const { currentUser } = useAuth();
    const { getBlog, getTags } = useFetchBlogs();
    const router = useRouter()

    async function fetchTags() {
        try {
            const _tags = await getTags();
            setTags(_tags.data);
        } catch (e) {
            toast.error('Error fetching tags');
            setTags([]);
        }
    }

    // formItems used to generate the blog attributes form
    const formItems = useMemo(() => {
        // Map through form items
        return _formItems.map(item => {
            // Return the default if name is not tags or tags is falsy
            if (item.name !== 'tags' || !tags) return item;
            
            if (item.input.type !== 'multi') return item;


            // tags is truthy so replace the empty array with tags from firebase
            return {
                ...item,
                input: {
                    ...item.input,
                    options: tags
                }
            }


        })
    }, [tags]);

    async function saveNewTags(newTags: NewTag[]) {
        for (const tag of newTags) {
            const ref = doc(collection(db, 'tags'))
            try {
                await setDoc(doc(db, 'tags', tag.id), {
                    id: tag.id,
                    tag: tag.tag
                })
            } catch(e) {
                toast.error(`Error saving tag: ${tag.tag}, error: ${e}`)
            }
        }
    }

    const saveBlog = async (attributes: FirebaseBlogData) => {
        try {
            const blogReference = blogRef !== undefined ? blogRef : doc(collection(db, 'blogs'));
            await setDoc(blogReference, {
                ...attributes,
                created: blogCreateDate,
                displayName: currentUser?.displayName || 'Anonymous',
                // When we are editing a blog, add the updated attribute
                ...(blogRef ? { updated: new Date().toISOString() } : {})
            })
            toast.success('Blog Saved!');
        } catch(e) {
            toast.error(`Error - failed to save blog, reason: ${e}`);
        } finally {
            setLoading(false);
        }

        if (Array.isArray(attributes.tags)) {
            await saveNewTags(attributes.tags.filter((tag: Tag) => tag.isNew))
        }

    }

    // On page mount
    useEffect(() => {
        (async function() {

            // get tags
            await fetchTags();

            // Blog id has been passed as a url param
            if (router.query?.e) {

                const id = typeof router.query?.e === 'string' ? router.query?.e : '';
                // Set the blog ref
                setBlogRef(doc(db, 'blogs', id))
                // If blog id is valid
                if (id !== '') {
                    const blog = await getBlog(id);

                    // Error fetching blog - return an error message
                    if (blog.status !== 200) {
                        setDefaultValues(null);
                        // set loading to false
                        setLoading(false);
                        return toast.error(blog.error);
                    }

                    // Set the default values
                    // @ts-ignore
                    setDefaultValues(parseDefaultValues(blog.data as unknown as FormState))
                    // Update the creation date
                    // This is to keep the original date when saving an existing blog
                    setBlogCreateDate(blog.data.created);

                // blog not found
                } else {
                    // set loading to false
                    setLoading(false);
                    return toast.error('Error - unable to find blog');
                }
            } else {
                setDefaultValues(null);
                // If a blogId has not been received, create a new reference which will be used when saving
                // This will overwrite each time we save
                setBlogRef(doc(collection(db, 'blogs')));
            }
            // set loading to false
            setLoading(false);
        })();
    });

    return {
        defaultValues,
        saveBlog,
        loading,
        formItems
    }
}