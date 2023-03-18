import React, { useRef, useState } from 'react';
import { Form, Card, CardBody, Button, Alert } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';


import FormInput from '@/components/inputs/formInput';
import { useAuth } from '@/contexts/authContext';
import CentreVertical from '@/components/helpers/centreVertical';

export default function UpdateProfile() {

    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>();
    const nameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const passwordConfRef = useRef<HTMLInputElement>();
    const { currentUser, updateEmail, updatePassword, updateProfile } = useAuth();
    const router = useRouter();

    const onSubmit = (e: React.FormEvent) => {

        if (currentUser) {
            e.preventDefault();
            setError('');
            setLoading(true);

            const email = emailRef.current?.value;
            const name = nameRef.current?.value;
            const password = passwordRef.current?.value;
            const passwordConf = passwordConfRef.current?.value;
            
            if (password !== passwordConf) {
                setLoading(false);
                return setError('Error - passwords do not match');
            }

            const promises = [];

            if (email !== currentUser.email) {
                promises.push(updateEmail(email));
            }

            if (password) {
                promises.push(updatePassword(password));
            }

            if (name !== currentUser.displayName) {
                promises.push(updateProfile(name));
            }

            Promise.all(promises)
                .then(() => {
                    router.push('/dashboard');
                })
                .catch(() => {
                    setError('Failed to update account');
                })
                .finally(() => {
                    setLoading(false);
                })
        }

    }

    return (
        <CentreVertical maxWidth={550}>
            <Card>
                <CardBody>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && 
                        <Alert color="danger">{error}</Alert>
                    }
                    <Form onSubmit={onSubmit}>
                        <FormInput 
                            label="Email" 
                            type="email"
                            inputRef={emailRef}
                            defaultValue={currentUser?.email}
                        />
                        <FormInput 
                            label="Name" 
                            type="text"
                            inputRef={nameRef}
                            defaultValue={currentUser?.displayName}
                        />
                        <FormInput 
                            label="Password (Leave blank to keep)" 
                            type="password"
                            inputRef={passwordRef}
                        />
                        <FormInput 
                            label="Password Confirm" 
                            type="password"
                            inputRef={passwordConfRef}
                        />
                        <Button 
                            type="submit" 
                            color="primary"
                            className="w-100"
                            disabled={loading}
                        > 
                            Update
                        </Button>
                    </Form>
                </CardBody>
            </Card>  
            <div className="w-100 text-center mt-2">
                <Link href="/dashboard">Cancel</Link>
            </div>
        </CentreVertical>
    )
}
