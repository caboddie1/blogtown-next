import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Category } from "../categories/types";

interface Props {
    categories: Category[];
}

export default function useBlogListSetup({ categories }: Props) {

    const [category, setCategory] = useState<string>();

    const router = useRouter();

    // Return boolean once categories are loaded and state is set
    function categoryIsValid() {
        return category === 'all' || categories.some(r => r.name === category)
    }

    (function setCategoryState() {
        const id = String(router.query.id || '');
        if (id === category) return;
        setCategory(id)
    })();

    (function() {
        if (!category) return;
        // When category is false redirect to all
        // Can be undefined so specific check is required
        if (categoryIsValid() === false) {
            router.push('/blogs/categories/all');
            return;
        }
    })();


    const categoryLabel = useMemo(() => {
        if (typeof category !== 'string') return;
        return category[0].toUpperCase() + category.slice(1)
    }, [category]);



    return {
        category: categoryLabel,
    }

}