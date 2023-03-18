import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap'
import { InputType } from 'reactstrap/types/lib/Input';

interface Props {
    label: string;
    type: InputType;
    inputRef: any;
    defaultValue? : string | null | undefined;
}

export default function FormInput({ label, type, inputRef, defaultValue = '' }: Props) {
    

    const id = label.toLowerCase().split(' ').join('-');
    return (
        <FormGroup id={`input-${id}`} floating>
            <Input
                innerRef={inputRef}
                id={id}
                name={id}
                placeholder={label}
                type={type}
                defaultValue={defaultValue ? defaultValue : ''}
            />
            <Label for={id}>
                {label}
            </Label>
        </FormGroup>           
    )
}