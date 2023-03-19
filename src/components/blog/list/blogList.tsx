import React, { useMemo } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge, Col, Row } from 'reactstrap';
import Link from 'next/link';
import Head from 'next/head';
import moment from 'moment';

import { Blog } from '../types';
import placeholder from '/images/placeholder.svg';
//import './blogList.css';
import Breadcrumb from '@/components/helpers/breadcrumb';
import { generateBreadcrumb } from '@/components/helpers/breadcrumb/utils';
import ResponsiveImage from '@/components/responsiveImage/responsiveImage';

interface Props {
    blogs: Blog[];
    category?: string;
    drafts?: boolean;
}

export default function BlogList({ blogs, category = 'All', drafts = false }: Props) {

    const breadcrumbs = useMemo(() => {
        return generateBreadcrumb({ category });
    }, [category]);

    return (
        <>
            {!drafts &&
                <>
                    <h1>Welcome to Blogtown</h1>
                    <p>Explore the Latest Blogtown Posts with Our Up-to-Date Blog List</p>
                    <Breadcrumb 
                        {...{
                            breadcrumbs,
                            className: 'mb-3'
                        }}
                    />
                </>
            }
            <ListGroup className="">
                {blogs.map((blog: Blog) => (
                    <ListGroupItem 
                        key={blog.id}
                        className="blog-list-item" 
                        style={{ cursor: 'pointer' }}
                        tag={Link}
                        href={`/blog/view/${blog.url}`}
                    >
                        <Row className="blog-item p-3">
                            <Col xl={2} xs={4} className="image-wrapper">
                                <ResponsiveImage 
                                    src={blog.image? blog.image : '/images/placeholder.svg' } 
                                    alt={blog.title} 
                                    maxHeight={250}
                                />
                            </Col>
                            <Col xl={10} xs={8}>
                                <ListGroupItemHeading>{blog.title}</ListGroupItemHeading>
                                <ListGroupItemText className="attribute mb-0">{blog.description}</ListGroupItemText>
                                <ListGroupItemText className="attribute">{moment(blog.created).format('Do MMM YYYY HH:mm')}</ListGroupItemText>
                                <div>
                                    {blog.tags.map((tag) => (
                                        <Badge key={tag.id} pill color="primary" className="me-2">
                                            {tag.tag}
                                        </Badge>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))}
            </ListGroup>         
        </>
    )
}
