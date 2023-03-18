import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap';
import { useRouter} from 'next/router';

import Navigation from './navigation';
import Footer from './footer';

interface Props {
    children: any;
}

export default function Layout({ children }: Props) {

    const { pathname } = useRouter();
    const [marginClass, setMarginClass] = useState<string>('mt-5');

    useEffect(() => {
        setMarginClass(pathname === '/create-blog' ? '' : 'mt-3 mt-lg-5');
    }, [pathname]);

    return (
        <>
            <Navigation />
            <Container fluid className={`w-100 ${marginClass} p-1 p-lg-3`}>
                {children}
            </Container>
            <Footer />
        </>
    )
}
