// Breadcrumb.stories.ts|tsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Breadcrumb from './breadcrumb';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const common = {
}

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
    <Breadcrumb { ...args } />
)

export const Primary = Template.bind({})
Primary.args = {
    breadcrumbs: [
        <span>Categories</span>,
        <span>Tech</span>,
    ]
}


