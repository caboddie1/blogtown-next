import React, { useRef, useState } from 'react'
import { Form, Card, CardBody, Button, Alert } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';


import FormInput from '@/components/inputs/formInput';
import { useAuth } from '@/contexts/authContext';
import CentreVertical from '@/components/helpers/centreVertical';
import Head from 'next/head';


export default function Signup() {

    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const passwordConfRef = useRef<HTMLInputElement>();
    const { signup, currentUser } = useAuth();
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordRef.current?.value !== passwordConfRef.current?.value) {
            return setError('Passwords do not match');
        }

        if (signup !== null) {
            try {
                setLoading(true);
                setError('');
                await signup(emailRef.current?.value, passwordRef.current?.value)
                router.push('/');
            } catch {
                return setError('Failed to create an account')  ;
            }
        }

        setLoading(false);

    }

    return (
        <>
            <Head>
                <title>Blog Town Signup</title>
                <meta name="description"content="Signup for a Blog Town account" />
            </Head>
            <CentreVertical maxWidth={550}>
                <Card>
                    <CardBody>
                        <h1 className="text-center mb-4">Sign Up</h1>
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
                            <FormInput 
                                label="Password Confirmation" 
                                type="password"
                                inputRef={passwordConfRef}
                            />
                            <Button 
                                type="submit" 
                                color="primary"
                                className="w-100"
                                disabled={loading}
                            > 
                                Sign Up
                            </Button>
                        </Form>
                    </CardBody>
                </Card>  
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link href="/auth/login">Log In</Link>
                </div>
            </CentreVertical>
        </>
    )
}
