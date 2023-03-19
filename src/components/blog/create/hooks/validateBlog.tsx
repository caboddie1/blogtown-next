import { useCallback, useEffect, useReducer } from "react";
import { FirebaseBlogData, FormError, FormErrorAction, FormItem, FormItemStateAction, FormItemStateType, FormState } from "../form/types";


interface Props {
    formItems: FormItem[];
    form: {
        state: FormState;
        dispatch: React.Dispatch<FormItemStateAction>;
    }
    onBlogSave?: (args: FirebaseBlogData) => void;
}

function errorReducer(state: FormError[], action: FormErrorAction) {
    switch(action.type) {
        case 'SET_ERRORS':
            return action.payload;
        case 'REMOVE_ERROR':
            return state.filter(error => error.name !== action.payload);
        case 'REMOVE_ALL_ERRORS':
            return []
    }
}

export default function useValidateBlog({ formItems, onBlogSave, form: { state, dispatch } }: Props) {

    const [errorState, errorDispatch] = useReducer(errorReducer, []);

    const validate = useCallback((): FormError[] => {
        return formItems
            .filter(item => {
                if (item.input.type === 'single') {
                    const value = state?.[item.name]?.value;
                    return value === undefined;
                }

                if (item.input.type !== 'text') return false;

                const value = String(state?.[item.name]?.value || '');

                if (value.length < item.input.minLength) return true;
                return false;
            })
            .map(item => {
                const minLength = item.input.type === 'text' ? item.input.minLength : 0;
                const errorMessages: { [k: string]: string } = {
                    text: `Please enter a ${item.label} with a length greater than ${minLength}`,
                    single: `Please select a ${item.label}`,
                }
                return {
                    message: errorMessages?.[item.input.type] || 'Validation error',
                    name: item.name,
                    label: item.label
                } as FormError
            })
    }, [formItems, state]);

    function save() {
        const errors = validate();
        if (errors.length > 0) {
            errorDispatch({ type: 'SET_ERRORS', payload: errors })
            return;
        }

        errorDispatch({ type: 'REMOVE_ALL_ERRORS' })
        // TODO: Save blog at this point
        const attributes: FirebaseBlogData = Object
            .keys(state)
            .reduce((prev, key) => {
                const current: FormItemStateType = state[key];
                return {
                    ...prev,
                    [key]: current.value
                }
            }, {});

        if (onBlogSave) onBlogSave(attributes);

    }

    useEffect(() => {
        if (errorState.length === 0) return;
        const errors = validate();
        errorDispatch({ type: 'SET_ERRORS', payload: errors })
    }, [state, errorState.length, validate]);

    return {
        errors: errorState,
        saveblog: save
    }

}