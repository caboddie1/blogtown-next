// Categories.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Categories from './categoriesContent';
import { categories } from './testData';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/Categories',
  component: Categories,
} as ComponentMeta<typeof Categories>;

const common = {
}

const Template: ComponentStory<typeof Categories> = (args) => (
    <Categories { ...args } />
)

export const Primary = Template.bind({})
Primary.args = {
    categories: categories
}

