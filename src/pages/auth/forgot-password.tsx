import React, { useState, useRef } from 'react';
import Link from 'next/link';

import { Form, Card, CardBody, Button, Alert } from 'reactstrap';

import FormInput from '@/components/inputs/formInput';
import { useAuth } from '@/contexts/authContext';
import CentreVertical from '@/components/helpers/centreVertical';


export default function ForgotPassword() {
    const [ error, setError ] = useState<string>('');
    const [ message, setMessage ] = useState<string>('');
    const [ loading, setLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>();
    const { forgotPassword } = useAuth();


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setMessage('');
            setLoading(true);
            setError('');
            await forgotPassword(emailRef.current?.value);
            setMessage('Check your inbox for further instruction')
        } catch {
            setError('Failed to reset password');
        }

        setLoading(false);

    }

    return (
        <CentreVertical maxWidth={550}>
            <Card>
                <CardBody>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {message && 
                        <Alert color="success">{message}</Alert>
                    }
                    <Form onSubmit={onSubmit}>
                        <FormInput 
                            label="Email" 
                            type="email"
                            inputRef={emailRef}
                        />
                        <Button 
                            type="submit" 
                            color="primary"
                            className="w-100"
                            disabled={loading}
                        > 
                            Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link href="auth/login">
                            Log In
                        </Link>
                    </div>
                </CardBody>
            </Card>  
            <div className="w-100 text-center mt-2">
                Need an account, <Link href="/auth/signup">sign up</Link>
            </div>
        </CentreVertical>
    )
}
