import React, { useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import { MultiValue, GroupBase } from 'react-select';
import type { Tag } from '@/components/blog/types';

interface Props {
    tags: MultiValue<Tag>;
    setTags: Function;
}

export default function CreatableMulti( { tags, setTags }: Props) {




    return (
        <CreatableSelect<Tag>
            placeholder="Tags"
            onChange={( newValue) => {
                if (newValue) setTags(newValue);
            }}
            options={tags}
            getOptionLabel={(tag) => tag.tag}
            getOptionValue={(tag) => tag.id}
            value={[]}
        />
    );
}