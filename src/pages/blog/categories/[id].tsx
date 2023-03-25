import styled from '@emotion/styled';
import React from 'react';

import { Container } from 'reactstrap';
import Loading from '@/components/helpers/loading';
import TikTok from '@/components/socialFeeds/tikTok';
import useBlogListSetup from '@/components/blog/hooks/blogListSetup';
import BlogList from '@/components/blog/list/blogList';
import Head from 'next/head';
import { getCategories } from '@/api/categories';
import { getBlogsPublished } from '@/api/blogs';
import { GetStaticProps } from 'next';
import { FetchBlogs } from '@/hooks/getBlogs';
import { ParsedUrlQuery } from 'querystring';
import { Category } from '@/components/blog/categories/types';

interface Params extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
	const blogs = await getBlogsPublished({ published: true, category: params?.id })
	const categoryData = await getCategories();

	return {
		props: {
			blogs,
			categories: categoryData.data
		}
	}
}

export async function getStaticPaths() {

	const categories = (await getCategories())?.data.map(r => r.name)

	return {
		paths: [...categories, 'all'].map(path => ({
			params: {
				id: path
			}
		})),
		fallback: false
	}
}

interface Props {
	blogs: FetchBlogs;
	categories: Category[];
}

export default function BlogListWrapper({ blogs, categories }: Props) {

	const { category } = useBlogListSetup({ categories })

    return (
		<>
			<Head>
                <title>Blog Town - Browse {category} Blogs</title>
                <meta 
                    name="description" 
                    content="Get inspired for your next adventure with Blog Town, a blog dedicated to travel and technology. Read destination guides, travel tips, and technology reviews. Start exploring now!" 
                />
            </Head>
			<Container>
				{blogs &&
					<BlogList 
						blogs={blogs.data}
						category={category}
					/>
				}
				<TikTok />
			</Container>
		</>
    )
}

const Error = styled.div(() => ({
	background: '#fff',

}));