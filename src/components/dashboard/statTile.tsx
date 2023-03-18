import React from 'react';
import { Card, CardBody } from 'reactstrap';

interface Props {
    number: string;
    text: string;
    className?: string;
}

export default function StatTile({ number, text, className = '' }: Props) {
    return (
        <Card className={className}>
            <CardBody>
                <strong className="text-center w-100" style={{ display: 'block', fontWeight: 700, fontSize: '3em' }}>{number}</strong>
                <h2 className="text-center mb-4">{text}</h2>
            </CardBody>
        </Card>
    )
}
