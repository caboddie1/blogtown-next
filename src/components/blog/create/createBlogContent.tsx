import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDown from '@/components/reactDown';
import BlogControls from '@/components/blog/create/controls/blogControls';
import Tabs from '@/components/blog/create/controls/tabs';
import { FirebaseBlogData, FormItem, FormState } from '@/components/blog/create/form/types';
import useCreateBlog from './hooks/createBlog';
import useForm from './form/hooks/form';

interface Props {
    defaultValues?: FormState | null;
    onBlogSave?: (args: FirebaseBlogData) => void;
    formItems: FormItem[];
}

export default function CreateBlogContent({ defaultValues, onBlogSave, formItems }: Props) {


    const { state, dispatch } = useForm({ formItems, defaultValues });

    const {         
        tabs,
        expandPreview,
        setExpandPreview,
        breakpoint,
        saveblog
    } = useCreateBlog({ defaultValues, onBlogSave, form: { state, dispatch }, formItems });

    return (
        <Container fluid>
            <Row>
                <Col lg={12}>
                    <Row>
                        {!expandPreview && 
                            <Col sm={12} md={6} style={{ padding: 0 }}>
                                {tabs &&
                                    <Tabs 
                                        tabs={tabs}
                                    />
                                }
                            </Col>
                        }
                        <Col sm={12} md={expandPreview ? 12 : 6} style={{padding: 0}}>
                            <BlogControls 
                                dispatchPreview={() => setExpandPreview(state => !state)}
                                dispatchSave={saveblog}
                            />
                            {breakpoint !== 'sm' &&
                                <div className="p-3" style={{ height: '80vh', overflow: 'auto' }}>
                                    <ReactDown markdown={String(state.content.value || '')} />
                                </div>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
