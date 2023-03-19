import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import queryString, { parse } from 'query-string';
import moment from 'moment';

import { Blog as BlogInterface } from '../types';
import ReactDown from '../../ReactDown/ReactDown';
import { useAuth } from '../../../contexts/AuthContext';
import useFetchBlogs from '../../../hooks/getBlogs';
import HelmetHelper from '../../Helpers/HelmetHelper';
import { generateBreadcrumb } from '../../Helpers/Breadcrumb/utils';
import Breadcrumb from '../../Helpers/Breadcrumb';
import TikTok from '../../socialFeeds/TikTok';

export default function Blog() {

    const [ blog, setBlog ] = useState<BlogInterface>();
    const [error, setError] = useState<string>('');
    const { isAdmin } = useAuth();
    const params = useParams();
    const location = useLocation();
    const parsed = queryString.parse(location.search);
    //const id = params.id ? params.id : '';
    const id: string | null = parsed.id ? String(parsed.id) : null;

    const { getBlog } = useFetchBlogs();

    useEffect(() => {
        (async function() {
            if (id !== null) {
                const blog = await getBlog(id);

                if (blog.status !== 200) {
                    return setError(blog.error);
                }

                setBlog(blog.data);

            } else {
                setError('Error - unable to find blog');
            }
        })();
    }, []);

    const breadcrumbs = useMemo(() => {
        if (!blog) return []
        const { title, category } = blog;

        return generateBreadcrumb({ category: String(category?.category || 'All'), blog: title })
    }, [blog])

    return (
        <>
            {blog &&
                <>
                    <HelmetHelper
                        title={blog.title}
                        description={blog.description}
                    />
                    <Container>
                        <Row>
                            <Col sm={12} className="mb-2 px-2 px-lg-3">
                                <Breadcrumb {...{
                                    breadcrumbs,
                                    className: 'mb-2'
                                }}
                                />
                                {isAdmin &&
                                    <Button color="primary" className="mb-3" tag={Link} to={`/create-blog?e=${blog?.id}`}>
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
        </>
    )
}
