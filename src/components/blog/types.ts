import { MultiValue } from "react-select";

export interface CategoryOption {
    readonly id: string;
    readonly category: string;
}

export interface ICreateBlog {
    title: string;
    tags: MultiValue<Tag>;
    created: string;
    content: string;
    description: string;
    published: boolean;
    url: string;
    displayName: string;
    image?: string;
    category: CategoryOption;
}

export interface Blog extends ICreateBlog {
    id: string;
}



export interface Tag {
    readonly id: string;
    readonly tag: string;
    readonly isNew?: boolean;
}

export interface NewTag extends Tag {
    isNew: true;
}
