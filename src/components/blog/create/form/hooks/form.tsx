import { useReducer } from 'react';
import { FormItem, FormState, FormItemStateAction, InputTypes, DefaultValue } from '../types'

interface Props {
    formItems: FormItem[];
    defaultValues?: FormState | undefined | null;
}

function reducer(state: FormState, { type, payload }: FormItemStateAction) {

    switch(type) {
        case 'UPDATE_STATE':
            return {
                ...state,
                [payload.name]: {
                    ...state[payload.name],
                    ...payload,
                }
            } as FormState
    }
}

function getInitialValue(type: InputTypes) {
    switch(type) {
        case 'text':
            return '';
        case 'multi': 
            return [];
        case 'checkbox':
            return false;
        case 'single':
            return undefined;
    }
}



export default function useForm({ formItems, defaultValues }: Props) {

    function getInitialState() {
        return formItems.reduce((prev, { name, input }) => ({
            ...prev,
            [name]: {
                //name,
                value: defaultValues?.[name]?.value || getInitialValue(input.type),
                type: input.type
            }
        }), {})

    }

    const [state, dispatch] = useReducer(reducer, getInitialState());

    return {
        state,
        dispatch
    }
}