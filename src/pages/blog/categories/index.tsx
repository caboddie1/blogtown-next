import React, { useEffect } from 'react'


import Loading from '@/components/helpers/loading';
import CategoriesContent from '@/components/blog/categories/categoriesContent';

import useCategories from '@/hooks/getCategories';

export default function Categories() {

    const { state, isLoading } = useCategories()


    return (
        <Loading
            isLoading={isLoading}
        >
            {state?.data &&
                <CategoriesContent 
                    categories={state?.data}
                />
            }
        </Loading>
    )
}
