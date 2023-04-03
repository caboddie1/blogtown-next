import { initializeApp } from 'firebase/app';
import { getAuth , Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
}

const app = initializeApp(config);

export const auth = getAuth(app) as Auth;
export default app;

export const db = getFirestore(app);