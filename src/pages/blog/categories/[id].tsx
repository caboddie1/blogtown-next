import styled from '@emotion/styled';
import React from 'react';

import { Container } from 'reactstrap';
import Loading from '@/components/helpers/loading';
import TikTok from '@/components/socialFeeds/tikTok';
import useBlogListSetup from '@/components/blog/hooks/blogListSetup';
import BlogList from '@/components/blog/list/blogList';
import Head from 'next/head';
import { FetchCategories, getCategories } from '@/api/categories';



export default function BlogListWrapper() {


	const { blogs, error, category, isLoadingBlogs } = useBlogListSetup()

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
				<Loading isLoading={isLoadingBlogs}>
					{blogs &&
						<BlogList 
							blogs={blogs}
							category={category}
						/>
					}
					{error &&
						<Error className="p-5 text-center">{error}</Error>
					}
				</Loading>
				<TikTok />
			</Container>
		</>
    )
}

const Error = styled.div(() => ({
	background: '#fff',

}));