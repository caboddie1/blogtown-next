import Layout from '@/components/layout';
import { AuthProvider } from '@/contexts/authContext';
import initAuth from '@/initAuth';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from 'firebase/app';
import type { AppProps } from 'next/app';
initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
})
initAuth()

export default function App({ Component, pageProps }: AppProps) {
	return (
			<Layout>
				<Component {...pageProps} />
			</Layout>
	)
}
