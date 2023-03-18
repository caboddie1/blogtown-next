import React, { useEffect, useRef, useState } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { FormItem, FormItemStateAction } from '../types';

interface Props {
    item: FormItem;
    dispatch: React.Dispatch<FormItemStateAction>;
    value: string;
}

export default function TextInput({ item: { label, name }, dispatch, value }: Props) {
    const id = name;

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'UPDATE_STATE',
            payload: {
                value: event.target.value,
                type: 'text',
                name
            }
        })
    }

    return (
        <FormGroup id={`input-${id}`} floating>
            <Input
                id={id}
                name={id}
                placeholder={label}
                type={'text'}
                //defaultValue={''}
                onChange={onInputChange}
                value={value}
            />
            <Label for={id}>
                { label}
            </Label>
        </FormGroup>           
    )
}
