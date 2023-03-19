import React from 'react'

interface Props {
    condition: boolean;
    wrapper: (children: JSX.Element) => JSX.Element;
    children: JSX.Element;
}

export default function ConditionalWrapper({
    condition,
    wrapper,
    children
}: Props) {
    return condition ? wrapper(children) : children;
}
