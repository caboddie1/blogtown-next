import React, { useState, useEffect, useMemo } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import queryString from 'query-string';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Blog as BlogInterface } from '@/components/blog/types';
import ReactDown from '@/components/reactDown';
import { useAuth } from '@/contexts/authContext';
import useFetchBlogs from '@/hooks/getBlogs';
import { generateBreadcrumb } from '@/components/helpers/breadcrumb/utils';
import Breadcrumb from '@/components/helpers/breadcrumb';
import TikTok from '@/components/socialFeeds/tikTok';
import Head from 'next/head';

export default function Blog() {

    const [ blog, setBlog ] = useState<BlogInterface>();
    const [error, setError] = useState<string>('');
    const { isAdmin } = useAuth();
    const router = useRouter();
    const params = router.query;
    const id: string | null = params.id ? String(params.id) : null;

    const { getBlogByUrl } = useFetchBlogs();

    useEffect(() => {
        (async function() {
            if (id !== null) {
                const blog = await getBlogByUrl(String(id || ''));

                if (blog.status !== 200 || blog.data.length === 0) {
                    return setError(blog.error);
                }

                setBlog(blog.data[0]);

            } else {
                setError('Error - unable to find blog');
            }
        })();
    });

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
                        <title>{blog.title}</title>
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
                                {blog && 
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
                                }
                            </Col>
                        </Row>
                        {error && <p>{error}</p>}

                        <TikTok />
                    </Container>
                </>
            }
            {error !== '' &&
                <p>{error}</p>
            }
        </>
    )
}
