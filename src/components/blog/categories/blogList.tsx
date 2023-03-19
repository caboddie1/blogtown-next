import styled from '@emotion/styled';
import React from 'react';

import { Container } from 'reactstrap';
import Loading from '@/components/helpers/loading';
import TikTok from '@/components/socialFeeds/tikTok';
import useBlogListSetup from '@/components/blog/hooks/blogListSetup';
import BlogList from '../list/blogList';

export default function BlogListWrapper() {

	const { blogs, error, category, isLoadingBlogs } = useBlogListSetup()

    return (
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
    )
}

const Error = styled.div(() => ({
	background: '#fff',

}));