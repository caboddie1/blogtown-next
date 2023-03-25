import React, { useState, useEffect, useMemo } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Blog as BlogInterface } from '@/components/blog/types';
import ReactDown from '@/components/reactDown';
import { useAuth } from '@/contexts/authContext';
import useFetchBlogs, { FetchBlogs } from '@/hooks/getBlogs';
import { generateBreadcrumb } from '@/components/helpers/breadcrumb/utils';
import Breadcrumb from '@/components/helpers/breadcrumb';
import TikTok from '@/components/socialFeeds/tikTok';
import Head from 'next/head';
import { getBlogByUrl, getBlogsPublished } from '@/api/blogs';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface Props {
    blog: BlogInterface | null;
}

interface Params extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params } ) => {
    const result = await getBlogByUrl(params?.id!)
    const blog = result.data.length > 0 ? result.data[0] : null;

    return {
        props: {
            blog: blog
        }
    }
}

export async function getStaticPaths() {

	const blogs = await getBlogsPublished({ published: true, category: 'all' })

    return {
        paths: blogs.data.map(blog => ({
            params: {
                id: blog.url
            }
        })),
        fallback: false
    }
}


export default function Blog({ blog }: Props) {

    const { isAdmin } = useAuth();


    const breadcrumbs = useMemo(() => {
        if (!blog) return []
        const { title, category } = blog;

        return generateBreadcrumb({ category: String(category?.category || 'All'), blog: title })
    }, [blog])

    return (
        <>
            {blog &&
                <>
                    <Head>
                        <title>Blogtown - {blog.title}</title>
                        <meta name="description" content={blog.description} />
                    </Head>
                    <Container>
                        <Row>
                            <Col sm={12} className="mb-2 px-2 px-lg-3">
                                <Breadcrumb {...{
                                    breadcrumbs,
                                    className: 'mb-2'
                                }}
                                />
                                {isAdmin &&
                                    <Button color="primary" className="mb-3" tag={Link} href={`/blog/create?e=${blog?.id}`}>
                                        Edit
                                    </Button>
                                }
                            </Col>
                            <Col sm={12} className="px-0 px-lg-3">
                                {blog ?
                                    <article>
                                        <div className="card p-2 p-lg-3 mb-3">
                                            <h1>{blog.title} </h1>
                                            <p className="secondary-text">
                                                By {blog?.displayName || 'Anonymous'}
                                                {' > '}
                                                {moment(blog.created).format('Do MMM YYYY HH:mm')}
                                            </p>
                                            <p className="secondary-text mb-0">{blog.description}</p>
                                        </div>
                                        <div>
                                            <ReactDown markdown={blog.content} />
                                        </div>
                                    </article>
                                :
                                    <p>Error fetching blog</p>
                                }
                            </Col>
                        </Row>

                        <TikTok />
                    </Container>
                </>
            }
        </>
    )
}
