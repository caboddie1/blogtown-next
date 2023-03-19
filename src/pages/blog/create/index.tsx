import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

import Loading from '@/components/helpers/loading';

import useSaveBlog from '@/components/blog/create/hooks/saveBlog';
import CreateBlogContent from '@/components/blog/create/createBlogContent';
import ProtectedRoute from '@/components/protected/protectedRoute';

export default function CreateBlog() {

    const { defaultValues, saveBlog, loading, formItems } = useSaveBlog();

    return (
        <ProtectedRoute>
            <Head>
                <title>Blogtown - Create New Blog</title>
            </Head>
            <Loading
                {...{
                    isLoading: loading,
                }}
            >
                {defaultValues !== undefined &&
                    <CreateBlogContent
                        {...{
                            defaultValues,
                            formItems,
                            onBlogSave: saveBlog
                        }}
                    />
                }
                <ToastContainer
                    {...{
                        autoClose: 10000,
                        closeOnClick: true,
                        theme: 'colored'
                    }}
                />
            </Loading>
        </ProtectedRoute>
    )
}
