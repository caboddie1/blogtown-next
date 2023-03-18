import moment from 'moment'
import React from 'react'
import { MultiValue, SingleValue } from 'react-select'
import Select from 'react-select'
import { CategoryOption } from '@/components/blog/types'
import { FormItem, FormItemStateAction } from '../types'

interface Props {
    item: FormItem;
    dispatch: React.Dispatch<FormItemStateAction>;
    options: CategoryOption[];
    value: SingleValue<CategoryOption>
}

export default function Single({ item: { label, input, name }, dispatch, value }: Props) {
    const onChange = (state: SingleValue<CategoryOption>) => {
        console.log()
        dispatch({
            type: 'UPDATE_STATE',
            payload: {
                value: state,
                type: 'single',
                name
            }
        })
    }

        return (input.type === 'single') ? (
            <div className='mb-3'>
                <Select
                    placeholder={label}
                    onChange={onChange}
                    options={input.options}
                    value={value}
                    getOptionLabel={(option) => option.category}
                    getOptionValue={(option) => option.id}
                />
            </div>
        )
        : <></>
}
