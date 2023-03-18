import React from 'react';
import { Alert } from 'reactstrap';
import Checkbox from './Inputs/checkbox';
import TextInput from './Inputs/inputText';
import Multi from './Inputs/multi';
import Single from './Inputs/single';
import { FormError, FormItem, FormItemStateAction, FormState } from './types';

export interface Props {
    formItems: FormItem[];
    dispatch: React.Dispatch<FormItemStateAction>;
    state: FormState;
    errors: FormError[];
}

export default function Form({ formItems, dispatch, state, errors }: Props) {

    const getError = (item: FormItem) => {
        return errors.find(err => err.name === item.name)
    }

    return (
        <div style={{ width: '100%'}}>
            {formItems.map(item => (
                <div key={item.name} className="mb-1">
                    {item.input.type === 'text' ?
                        <TextInput 
                            item={item}
                            value={item.input.getState(state)}
                            dispatch={dispatch}
                        />
                    : item.input.type === 'checkbox' ?
                        <Checkbox 
                            item={item}
                            dispatch={dispatch}
                            value={item.input.getState(state)}
                        />
                    : item.input.type === 'multi' ?
                        <Multi 
                            item={item}
                            dispatch={dispatch}
                            options={item.input.options}
                            value={item.input.getState(state)}
                        />
                    : item.input.type === 'single' ?
                        <Single 
                            item={item}
                            dispatch={dispatch}
                            options={item.input.options}
                            value={item.input.getState(state)}
                        />
                    :
                        <></>
                    }
                    {getError(item) && 
                        <Alert
                            color="danger"
                            className="py-1 px2"
                        >
                            {getError(item)?.message}
                        </Alert>
                    }
                </div>
            ))}
        </div>
    )
}
