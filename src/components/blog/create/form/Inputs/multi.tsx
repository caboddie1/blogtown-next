import React from 'react'
import { MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import moment from 'moment';

import type { Tag } from '@/components/blog/types';
import type { FormItem, FormItemStateAction } from '../types';


interface Props {
    item: FormItem;
    dispatch: React.Dispatch<FormItemStateAction>;
    options: MultiValue<Tag>;
    value: MultiValue<Tag>
}

export default function Multi( { item: { label, input, name }, dispatch, value }: Props) {

    const onChange = (state: MultiValue<Tag>) => {

        const removeDupes = Array
            .from(new Set(state.map(tag => tag.tag)))
            .map(tag => {
                const findTag = state.find(t => t.tag === tag)

                return findTag
            })
            .filter(tag => tag) as Tag[]


        dispatch({
            type: 'UPDATE_STATE',
            payload: {
                value: removeDupes,
                type: 'multi',
                name
            }
        })
    }

        return (input.type === 'multi') ? (
            <CreatableSelect
                isMulti
                placeholder={label}
                onChange={onChange}
                options={input.options}
                value={value}
                getOptionLabel={(option) => option.tag}
                getOptionValue={(option) => option.id}
                getNewOptionData={(option) => ({ 
                    id: `__createable_${moment().unix()}`, 
                    tag: option,
                    isNew: true
                })}
            />
        )
        : <></>

}
