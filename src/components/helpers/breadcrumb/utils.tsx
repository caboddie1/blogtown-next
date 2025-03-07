import { Children } from "react";
import Link from "next/link";
import DropdownMenu from "../dropdownMenu";
import { IMenuItem } from "../dropdownMenu/dropdownMenu";

const categories = ['All', 'Tech', 'Travel'];



const dropdownCategories: IMenuItem[] = categories.map(category => ({
    label: category,
    wrapper: (children) => (
        <Link href={`/blog/categories/${category.toLowerCase()}`}>
            {children}
        </Link>
    )
}))

interface GenerateBreadcrumbArgs {
    category?: string;
    blog?: string;
    showAll?: boolean;
}

export const generateBreadcrumb = ({ category, blog, showAll }: GenerateBreadcrumbArgs) => {
    return [
        <span key="b_1">Blogs</span>,
        <Link key="b_2" href="/">
            Categories
        </Link>,
        ...(!category) ? [] : [
            <DropdownMenu 
                key="b_3"
                {...{
                    buttonLabel: category,
                    items: dropdownCategories.filter(item => showAll ? true : category !== item.label)
                }}
            />,
        ],
        ...(!blog) ? [] : [
            <span key="b_4">{blog}</span>
        ]
    ]
}