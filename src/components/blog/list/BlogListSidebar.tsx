import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { BlogProvider } from '../../../contexts/BlogContext'
import { Blog } from '../types'

interface Props {
    blogs: Blog[];
}

export default function BlogListSidebar({ blogs }: Props) {
    return (
        <>
            <h2>Recently Added</h2>
            <ListGroup>
                {blogs.map((blog: Blog) => (
                    <ListGroupItem key={blog.id} style={{ cursor: 'pointer'}}>
                        {blog.title}
                    </ListGroupItem>
                ))} 
            </ListGroup>
        </>
    )
}
