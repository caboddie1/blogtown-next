import React, { useRef, useState } from 'react'
import { Form, Card, CardBody, Button, Alert } from 'reactstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import FormInput from '@/components/inputs/formInput';
import { useAuth } from '@/contexts/authContext';
import CentreVertical from '@/components/helpers/centreVertical';


export default function Login() {

    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const { login, currentUser } = useAuth();
    const router = useRouter();


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');
            await login(emailRef.current?.value, passwordRef.current?.value);
        } catch(e) {
            console.log(e)
            setLoading(false);
            return setError('Failed to login');
        } finally {
            setLoading(false);
        }

        router.push('/blogs');

    }

    return (
        <>
            <Head>
                <title>Login to Blog Town</title>
                <meta name ="description" content="Blog Town Login page"/>
            </Head>
            <CentreVertical maxWidth={550}>
                <Card>
                    <CardBody>
                        <h1 className="text-center mb-4">Log In</h1>
                        {error && 
                            <Alert color="danger">{error}</Alert>
                        }
                        <Form onSubmit={onSubmit}>
                            <FormInput 
                                label="Email" 
                                type="email"
                                inputRef={emailRef}
                            />
                            <FormInput 
                                label="Password" 
                                type="password"
                                inputRef={passwordRef}
                            />
                            <Button 
                                type="submit" 
                                color="primary"
                                className="w-100"
                                disabled={loading}
                            > 
                                Log In
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-2">
                            <Link href="/auth/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>
                    </CardBody>
                </Card>  
                <div className="w-100 text-center mt-2">
                    Need an account, <Link href="/auth/signup">sign up</Link>
                </div>
            </CentreVertical>
        </>
    )
}
