import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ListParser from './listParser';

interface Props {
    markdown: string;
}

export default function ReactDown({ markdown }: Props) {
    return (
        <div className="blog-container card">
            <div className="blog p-2 p-lg-4">
                <ReactMarkdown 
                    children={markdown} 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        em: ({ node, ...props}) => <i style={{color: 'blue'}} {...props} />,
                        ul: (props) => <ListParser { ...props } />,
                        li: ({node, ...props}) => (
                            <>
                                <li className="list-group-item" {...props}/>
                            </>
                        ),
                        table: ({ node, ...props }) => <table className="table" { ...props } />,
                        thead: ({ node, ...props }) => <thead className="thead-dark" { ...props } />,
                        code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={{
                                    ...tomorrow,
                                    fontSize: '1.4em'
                                }}
                                language={match[1]}
                                PreTag="div"
                                showLineNumbers
                                wrapLongLine
                                {...props}
                                codeTagProps={{
                                    style: {
                                        fontSize: '1.0em'
                                    }
                                }}
                            />
                            ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                            )
                        }
                    }}
                />         
            </div>
        </div>
    )
}
