import { useRouter } from 'next/router';

import { useAuth } from '@/contexts/authContext';

export default function useProtected() {

    const router = useRouter();
    const { isAdmin, userLoading } = useAuth();

    (function() {
        if (userLoading || isAdmin === null) return;
        if (!isAdmin) router.push('/');
    })();

}
