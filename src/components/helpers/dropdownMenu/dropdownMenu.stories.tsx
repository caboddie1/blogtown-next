// DropdownMenu.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import DropdownMenu from './dropdownMenu';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
} as ComponentMeta<typeof DropdownMenu>;

const common = {
}

const Template: ComponentStory<typeof DropdownMenu> = (args) => (
    <DropdownMenu { ...args } />
)

export const Primary = Template.bind({})
Primary.args = {
    buttonLabel: 'Menu',
    items: [
        {
            label: 'Hello'
        },
        {
            label: 'World',
            wrapper: (children) => (
                <a href="#">
                    {children}
                </a>
            )
        }
    ]
}


