import React, { useMemo, PropsWithChildren } from 'react';
import { UnorderedListProps, LiProps, ElementContent } from 'react-markdown/lib/ast-to-react';
import ImageGallery from './imageGallery';

interface Child {
    children: Child[];
    tagName: string;
    type: 'comment'|'element'|'text';
    properties: {
        src?: string;
        alt?: string;
    }
    position: {
        start: any;
        end: any;
    }
}
    
export default function ListParser({ node, ...props }: PropsWithChildren<UnorderedListProps>) {

    // Gets the list of child for ul element
    const liList = useMemo(() => {
        const liElement = node.children.filter( r => r.type === 'element') as unknown as PropsWithChildren<LiProps>[];
        const liChild: PropsWithChildren<any>[] = liElement.reduce((prev: PropsWithChildren<any>[], current) => {
            return [
                ...prev,
                ...current.children.map(r =>r)
            ]
        }, [])
        return liChild;

    }, [node])

    // Returns true if every element has an img tag
    const isImgList = useMemo(() => {

        if (liList.length === 0) return false;
        return liList.every(r => r.tagName === 'img')

    }, [liList]);

    return (
        <>
            {isImgList ?
                <ImageGallery images={liList.map((r,i) => ({ id: i, ...r.properties }))} />
            :
                <ul { ...props } />
            }
        </>
    )
}
