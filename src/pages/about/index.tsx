import { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap';

import CentreVertical from '@/components/helpers/centreVertical';
import Head from 'next/head';
export default function About() {

    return (
        <>
            <Head>
                <title>Blogtown - About</title>
                <meta name="description" content="Learn more about the author of the blog and the different types of posts that are going to be uploaded" />
            </Head>
            <CentreVertical maxWidth={950}>
                <Row>
                    <Col sm={12} lg={12}>
                        <div className="card p-2 p-lg-4 mb-2 mb-lg-0">
                            <h2 style={{ color: '#007e93' }}>Welcome to Blog town</h2>

                            <p>
                                Our blog is a virtual platform where you can discover new places and
                                experience different cultures. Each post provides unique perspectives 
                                providing a fresh take on UK and european travel, culture, and lifestyle 
                                topics. We will also be posting web development tutorials and guides.
                            </p>
                            <p>
                                Whether you&apos;re a seasoned traveler or just starting out on your journey, 
                                Blogtown is the perfect place to find inspiration and information. Our 
                                content ranges from destination guides and travel tips.
                            </p>
                            <p>
                                Thank you for visiting Blogtown and we hope you 
                                enjoy exploring with us!
                            </p>

                            <p>
                                If you have any questions, feel free to reach us on the email below:
                                <br />
                                <strong>theblogtown1 at gmail dot com.</strong>
                            </p>
                        </div>
                    </Col>
                </Row>
            </CentreVertical>
        </>
    )
}
