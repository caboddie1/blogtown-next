import React, { useEffect } from 'react'


import Loading from '@/components/helpers/loading';
import CategoriesContent from '@/components/blog/categories/categoriesContent';

import useCategories from '@/hooks/getCategories';
import Head from 'next/head';
import { FetchCategories, getCategories } from '@/api/categories';

export async function getStaticProps() {
	const categoryData = await getCategories();

	return {
		props: {
			categoryData
		}
	}

}

interface Props {
	categoryData: FetchCategories;
}

export default function Categories({ categoryData }: Props) {
    
    return (
        <>
            <Head>
                <title>Blogtown - View Blog Categories</title>
                <meta 
                    name="description"
                    content="Browse the different categories of blogs that Blogtown has to offer"
                />
            </Head>
                {categoryData.data && categoryData.error === '' &&
                    <CategoriesContent 
                        categories={categoryData.data}
                    />
                }
                {categoryData.error !== '' &&
                    <p>{categoryData.error}</p>
                }
        </>
    )
}
