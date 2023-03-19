import React from 'react';

import { useAuth } from '@/contexts/authContext';
import useProtected from '@/hooks/protected';

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {

    const { currentUser } = useAuth();
    useProtected();

    return !currentUser ? null : (
        <>
            {children}
        </>
    )
}
