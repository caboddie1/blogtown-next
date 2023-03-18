import React, { useContext, useState, useEffect } from 'react';
import { auth } from '@/firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateEmail as firebaseUpdateEmail,
    updatePassword as firebaseUpdatePassword,
    updateProfile as firebaseUpdateProfile,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { User } from 'firebase/auth';

import useFetchBlogs from '../hooks/getBlogs';

interface ContextValue {
    currentUser: User | null; 
    signup: Function;
    login: Function;
    forgotPassword: Function;
    updateEmail: Function;
    updatePassword: Function;
    updateProfile: Function;
    logout: Function;
    isAdmin: boolean | null | undefined;
    userLoading: boolean;
}

const AuthContext = React.createContext<ContextValue>({} as ContextValue);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: {children: React.ReactNode}) {

    const { getIsAdmin } = useFetchBlogs();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userLoading, setLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean|null>(null);


    function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function forgotPassword(email: string) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email: string) {
        if (currentUser) {
            return firebaseUpdateEmail(currentUser, email);
        }
    }

    function updatePassword(password: string) {
        if (currentUser) {
            return firebaseUpdatePassword(currentUser, password);
        }
    } 

    function updateProfile(displayName: string) {
        if (currentUser) {
            return firebaseUpdateProfile(currentUser, {
                displayName
            });
        }
    }

    function logout() {
        setIsAdmin(false);
        setCurrentUser(null);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
            if (!user) setIsAdmin(false)
        });

        return unsubscribe;

    }, []);

    useEffect(() => {
        if (currentUser) {
            (async () => {
                try {
                    setIsAdmin(await getIsAdmin(currentUser.uid));
                } catch(e) {
                    setIsAdmin(false);
                } 
            })()
        }
    }, [currentUser, getIsAdmin]);


    const value = {
        currentUser,
        signup,
        login,
        forgotPassword,
        logout,
        updateEmail,
        updatePassword,
        updateProfile,
        userLoading,
        isAdmin
    }

    return (
        <AuthContext.Provider value={value}>
            {!userLoading && children}
        </AuthContext.Provider>
    )
}

