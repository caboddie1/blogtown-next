import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useState, useMemo } from "react";
import { githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror  from '@uiw/react-codemirror';

import Form from "../form";
import type { Tab } from "../controls/tabs";
import useBreakpoint from "@/hooks/breakpoint";
import ReactDown from "@/components/reactDown";
import { FirebaseBlogData, FormItem, FormItemStateAction, FormState } from "@/components/blog/create/form/types";
import useValidateBlog from "./validateBlog";

interface Props {
    defaultValues?: FormState | null;
    onBlogSave?: (args: FirebaseBlogData) => void;
    form: {
        state: FormState;
        dispatch: React.Dispatch<FormItemStateAction>;
    };
    formItems: FormItem[];
}

export default function useCreateBlog({ onBlogSave, form: { state, dispatch }, formItems }: Props) {
    const [expandPreview, setExpandPreview] = useState<boolean>(false);
    const breakpoint = useBreakpoint();

    const { errors, saveblog } = useValidateBlog({ formItems, onBlogSave, form: { state, dispatch } })


    const tabs = useMemo((): Tab[] => {
        return [
            {
                label: 'Content',
                name: 'blogContent',
                renderContent: () => (
                    <CodeMirror
                        theme={githubDark}
                        height={'80vh'}
                        value={String(state.content.value || '')}
                        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
                        onChange={(value: string) => {
                            //setBlogContent(value);
                            dispatch({ type: 'UPDATE_STATE', payload: { value, name: 'content', type: 'text' } })
                        }}
                    />
                )
            },
            {
                label: errors.length > 0 ? 'Attributes !' : 'Attributes',
                name: 'blogAttrs',
                renderContent: () => (
                    <Form 
                        {...{
                            formItems: formItems.filter(r => r.type === 'form'),
                            dispatch,
                            state,
                            errors,
                        }} 
                    />
                )
            },
            ...(breakpoint !== 'sm' ? [] : [{
                label: 'Preview',
                name: 'blogPreview',
                renderContent: () => (
                    <div className="p-3" style={{ height: '80vh', overflow: 'auto' }}>
                        <ReactDown markdown={String(state.content.value || '')} />
                    </div>
                )
            }])
        ]
    }, [breakpoint, state, errors]);

    return {
        tabs,
        expandPreview,
        setExpandPreview,
        breakpoint,
        form: {
            state,
            dispatch
        },
        saveblog
    }
}