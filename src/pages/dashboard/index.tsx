import { useEffect } from 'react';
import React, { useState } from 'react';
import { Card, CardBody, Button, Alert, Row, Col } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useAuth } from '@/contexts/authContext';
import CentreVertical from '@/components/helpers/centreVertical';
import { Blog } from '@/components/blog/types';
import StatTile from '../../components/dashboard/statTile';
import useFetchBlogs  from '../../hooks/getBlogs';
import useProtected from '@/hooks/protected';
import ProtectedRoute from '@/components/protected/protectedRoute';
import BlogList from '@/components/blog/list/blogList';

interface Props {}

export default function Dashboard(props: Props) {

    const [error, setError] = useState<string>('');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const { currentUser, logout } = useAuth();
    const router = useRouter();
    const { getBlogs } = useFetchBlogs();

    async function handleLogout () {
        setError('');
        try {
            await logout();
        } catch {
            setError('failed to logout');
        } finally {
            router.push('/auth/login');
        }
    }

    useEffect(() => {
        (async function() {
            const blogs = await getBlogs();
            if (blogs.status !== 200) {
                return setError(blogs.error);
            } 

                return setBlogs(blogs.data);
        })();
    });

    return (
        <ProtectedRoute>
            <Head>
                <title>Blogtown User Dashboard</title>
            </Head>
            <CentreVertical>
                <Row>
                    {blogs.length > 0 &&
                            <Col lg={9} md={12} sm={12} className="mb-3">
                                <Card>
                                    <CardBody style={{ height: '80vh', overflowY: 'scroll' }}>
                                        <h2 className="text-center mb-4">Drafts</h2>
                                        {<BlogList blogs={blogs.filter((b: Blog) => !b.published)} drafts={true} />}
                                    </CardBody>
                                </Card>
                            </Col>
                    }
                        <Col lg={3} md={6} sm={12}>
                            <Card className="mb-3">
                                <CardBody>
                                    <h2 className="text-center mb-4">Profile</h2>
                                    {error && 
                                        <Alert color="danger">{error}</Alert>
                                    }
                                    <strong>
                                        Email:{' '}
                                    </strong>
                                    {currentUser?.email}
                                    <Link
                                        href="/user/update-profile"
                                        className="btn btn-primary w-100 mt-3"
                                    >
                                        Update Profile
                                    </Link>
                                    <Link
                                        href="blog/create"
                                        className="btn btn-primary w-100 mt-3"
                                    >
                                        Create Blog
                                    </Link>

                                    <div className="w-100 text-center mt-2">
                                        <Button onClick={handleLogout}>Log Out</Button>
                                    </div>
                                </CardBody>
                            </Card>
                            <StatTile 
                                className="mb-3"
                                number={String(blogs.filter((b: Blog) => b.published).length)} 
                                text="Published Blogs" 
                            />
                            <StatTile 
                                number={String(blogs.filter((b: Blog) => !b.published).length)} 
                                text="Drafts" 
                            />
                        </Col>
                </Row>
            </CentreVertical>
        </ProtectedRoute>
    )
}

