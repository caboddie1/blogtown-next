import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import React from 'react'
import MuiCheckbox from '@mui/material/Checkbox';
import { FormItem, FormItemStateAction } from '../types';

interface Props {
    item: FormItem;
    dispatch: React.Dispatch<FormItemStateAction>;
    value: boolean;
}

export default function Checkbox({ item : { label, name }, dispatch, value }: Props) {

    const onChange = (e:React.ChangeEvent<HTMLInputElement>, state: boolean) => {
        dispatch({
            type: 'UPDATE_STATE',
            payload: {
                type: 'checkbox',
                value: state,
                name
            }
        })
    }

    return (
        <FormGroup>
            <FormControlLabel 
                control={<MuiCheckbox 
                    onChange={onChange}
                    checked={value}
                    color="success"
                />} 
                label={label} 
            />
        </FormGroup>
    )
}
