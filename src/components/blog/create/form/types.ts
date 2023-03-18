import { BackdropProps } from "@mui/material";
import { MultiValue, SingleValue } from "react-select";
import { CategoryOption, Tag } from "../types";

export type InputTypes = 'text' | 'checkbox' | 'multi' | 'single';

type InputType = 
    | { type: 'text', minLength: number; getState: (state: FormState) => string; }
    | { type:  'checkbox'; getState: (state: FormState) => boolean; }
    | { type: 'multi'; options: MultiValue<Tag>; getState: (state: FormState) => Tag[] }
    | { type: 'single'; options: CategoryOption[]; getState: (state: FormState) => SingleValue<CategoryOption> };

export interface FormItem {
    input: InputType;
    label: string;
    name: string;
    type: 'form' | 'blogContent';
}

export type FormItemStateType =
    | { type: 'text'; value: string; }
    | { type: 'checkbox'; value: boolean; }
    | { type: 'multi'; value: MultiValue<Tag> }
    | { type: 'single'; value: SingleValue<CategoryOption> }



export interface FormState {
    [key: string]: FormItemStateType & {
        error?: boolean;
    };
}


export interface FormItemState {
    title: FormItemStateType;
}

type FormItemStatePayload = {
    name: string;
}

export type FormItemStateAction = 
    { 
        type: 'UPDATE_STATE'; 
        payload: { 
            value: string | boolean | MultiValue<Tag> | SingleValue<CategoryOption>;
            name: string;
            type: InputTypes;
        }
    }


export interface DefaultValue {
    name: string;
    value: string | boolean | MultiValue<Tag> | SingleValue<CategoryOption>;
}

export interface FormError {
    label: string;
    name: string;
    message: string;
}

export type FormErrorAction = 
| {
    type: 'SET_ERRORS';
    payload: FormError[];
}
| {
    type: 'REMOVE_ERROR';
    payload: string;
}
| {
    type: 'REMOVE_ALL_ERRORS';
}

export type FirebaseBlogDataItem = string | boolean | MultiValue<Tag> | SingleValue<CategoryOption>;

export interface FirebaseBlogData {
    [key: string]: FirebaseBlogDataItem;
}