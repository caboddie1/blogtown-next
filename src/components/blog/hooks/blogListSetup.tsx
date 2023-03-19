import { useEffect, useMemo, useState } from "react";
//import { useParams, useNavigate } from "react-router";
import { useRouter } from "next/router";
import useFetchBlogs, { FetchBlogs } from "../../../hooks/getBlogs";
import useCategories from "../../../hooks/getCategories";
import { Blog } from "../types";


export default function useBlogListSetup() {

    const [category, setCategory] = useState<string>();
    const [blogs, setBlogs] = useState<Blog[]>();
    const [error, setError] = useState<string>();

	//const params = useParams();
    const router = useRouter();

    const { state, isLoading } = useCategories()
    const { getBlogsPublished } = useFetchBlogs();

    // returns undefined if data hasn't finished loading
    // Return boolean once categories are loaded and state is set
    const categoryIsValid = useMemo((): undefined | boolean => {
        if (isLoading && !category) return;
        // Return true if category is all or matches any from the database
        return (category === 'all' || state?.data.some(r => r.name === category));

    }, [category, state, isLoading]);

    // Set the category when params change
    useEffect(() => {
        setCategory(String(router.query.id || ''));
    }, [router.query]);

    (function() {
        // When category is false redirect to all
        // Can be undefined so specific check is required
        if (categoryIsValid === false) {
            router.push('/blogs/categories/all');
            return;
        }
    })();

    useEffect(() => {
        if (!categoryIsValid) return;

        (async () => {
            const data = await getBlogsPublished({ published: true, category })

            if (data.status === 200) {
                setBlogs(data.data);
                return;
            }

            setError('Error fetching blogs, please refresh the page and try again.');
        })();

    }, [category, categoryIsValid, getBlogsPublished]);

    const categoryLabel = useMemo(() => {
        if (typeof category !== 'string') return;
        return category[0].toUpperCase() + category.slice(1)
    }, [category]);

    const isLoadingBlogs = useMemo((): boolean => {
        if (blogs || error) return false;
        return true;
    }, [blogs, error]);

    return {
        blogs,
        isLoadingBlogs,
        category: categoryLabel,
        error
    }

}