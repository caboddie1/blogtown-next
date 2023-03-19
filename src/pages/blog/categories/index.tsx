import React, { useEffect } from 'react'


import Loading from '@/components/helpers/loading';
import CategoriesContent from '@/components/blog/categories/categoriesContent';

import useCategories from '@/hooks/getCategories';
import Head from 'next/head';

export default function Categories() {

    const { state, isLoading } = useCategories()


    return (
        <>
            <Head>
                <title>Blogtown - View Blog Categories</title>
                <meta 
                    name="description"
                    content="Browse the different categories of blogs that Blogtown has to offer"
                />
            </Head>
            <Loading
                isLoading={isLoading}
            >
                {state?.data &&
                    <CategoriesContent 
                        categories={state?.data}
                    />
                }
            </Loading>
        </>
    )
}
