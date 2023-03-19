import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    breadcrumbs: JSX.Element[];
    className?: string;
    separator?: string | JSX.Element;
}

export default function Breadcrumb({ 
    breadcrumbs, 
    className = '', 
    separator = <FontAwesomeIcon icon={faChevronRight} />
}: Props) {
    return (
        <Breadcrumbs 
            className={className}
            separator={separator}
        >
            {breadcrumbs}
        </Breadcrumbs>
    )
}
