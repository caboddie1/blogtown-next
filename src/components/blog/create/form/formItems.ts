import { MultiValue, SingleValue } from "react-select";
import { FormItem } from "./types";
import { CategoryOption, Tag } from "../types";

export const formItems: FormItem[] = [
    { 
        input: {
            type: 'text',
            minLength: 10,
            getState: (state) => (state['title']?.value || '') as string
        },
        label: 'Title',
        name: 'title',
        type: 'form'
    },
    { 
        input: {
            type: 'text',
            minLength: 20,
            getState: (state) => (state['description']?.value || '') as string
        },
        label: 'Description',
        name: 'description',
        type: 'form'
    },
    { 
        input: {
            type: 'text',
            minLength: 10,
            getState: (state) => (state['url']?.value || '') as string
        },
        label: 'URL',
        name: 'url',
        type: 'form'
    },
    { 
        input: {
            type: 'text',
            minLength: 0,
            getState: (state) => (state['image']?.value || '') as string
        },
        label: 'Image',
        name: 'image',
        type: 'form'
    },
    { 
        input: {
            type: 'single',
            options: [
                { id: 'tech', category: 'Tech'},
                { id: 'travel', category: 'Travel'},
            ],
            // Todo: fix
            getState: (state) => (state['category']?.value || []) as SingleValue<CategoryOption>
        },
        label: 'Category',
        name: 'category',
        type: 'form'
    },
    { 
        input: {
            type: 'multi',
            options: [
            ],
            // Todo: fix
            getState: (state) => (state['tags']?.value || []) as Tag[]
        },
        label: 'Tags',
        name: 'tags',
        type: 'form'
    },
    { 
        input: {
            type: 'checkbox',
            getState: (state) => (state['published']?.value || false) as boolean
        },
        label: 'Publish',
        name: 'published',
        type: 'form',
    },
    {
        input: {
            type: 'text',
            minLength: 100,
            getState: (state) => (state['content']?.value || '') as string
        },
        label: 'Blog Content',
        name: 'content',
        type: 'blogContent'
    }
]