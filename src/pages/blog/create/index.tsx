import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '@/components/helpers/loading';

import useSaveBlog from '@/components/blog/create/hooks/saveBlog';
import CreateBlogContent from '../../../components/blog/create/createBlogContent';

export default function CreateBlog() {

    const { defaultValues, saveBlog, loading, formItems } = useSaveBlog();

    return (
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
    )
}
