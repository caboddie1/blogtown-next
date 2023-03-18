import React from 'react';

import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
    isLoading: boolean;
    message?: string;
    children: React.ReactNode;
}

const classNames = 'w-100 h-100 text-center d-flex align-items-center justify-content-center p-5'

export default function Loading({ 
    isLoading, 
    message = 'Loading Content', 
    children 
}: Props) {
    return (
        <>
            {isLoading ?
                <LoadingOverlay className={classNames}>
                    <div>
                        <CircularProgress />
                    </div>
                    <LoadingContent className="ms-2">
                        {message}
                    </LoadingContent>
                </LoadingOverlay>
            :
                <>
                    {children}
                </>
            }
        </>
    )
}

const LoadingOverlay = styled.div`
    background: #fff;
`

const LoadingContent = styled.div`
    font-weight: 600;
    color: #777;
`
