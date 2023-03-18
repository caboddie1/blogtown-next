import React from 'react';
import { Container } from 'reactstrap';

interface Props {
    children: JSX.Element[] | JSX.Element;
    maxWidth?: number;
}

export default function CentreVertical({ children, maxWidth } : Props) {

    const style: React.CSSProperties = {
        minHeight: '70vh'
    }

    if (maxWidth) style.maxWidth = maxWidth;

    return (
        <Container 
            className="d-flex align-items-center justify-content-center"
            style={style}
        >
            <div className="w-100">
                {children}
            </div>
        </Container>
    )
}
