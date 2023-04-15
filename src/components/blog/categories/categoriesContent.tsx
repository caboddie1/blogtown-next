import React from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import CentreVertical from '@/components/helpers/centreVertical';

import { Category } from './types';
import styled from '@emotion/styled';
import Link from 'next/link';
import ResponsiveImage from '@/components/responsiveImage/responsiveImage';

interface Props {
    categories: Category[];
}

export default function CategoriesContent({ categories }: Props) {
    return (
        <CentreVertical>
            <Container>
                <Button 
                    color='primary' 
                    className='ms-3'
                    tag={Link}
                    href="/blog/categories/all"
                >
                    View All
                </Button>
                <Row>
                    {categories.map(category => (
                        <StyledCol 
                            key={category.id}
                            xl={6}
                            sm={12}
                            className="p-4 text-center"
                            tag={Link}
                            href={`/blog/categories/${category.name}`}
                        >
                            <CategoryDiv className="border p-3">
                                <h1>{category.title}</h1>
                                <p>{category.description}</p>
                                    <ResponsiveImage
                                        src={category.image.src} 
                                        alt={category.image.alt} 
                                        maxHeight={230}
                                        className="text-center"
                                        center
                                    />
                            </CategoryDiv>
                        </StyledCol>
                    ))}
                </Row>
            </Container>
        </CentreVertical>
    )
}

const ImageStyle = styled.div`
    height: 230px;
    position: relative;
    img {
        width: auto!important;
    }

`

const CategoryDiv = styled.div`
    background-color: #fff;
`

const StyledCol = styled(Col)`
    text-decoration: none;
    color: #777;
`