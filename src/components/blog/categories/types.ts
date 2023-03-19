interface CategoryImage {
    src: string;
    alt: string;
}

export interface Category {
    id: string;
    name: string;
    title: string;
    description: string;
    image: CategoryImage;
}