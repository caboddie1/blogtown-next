// BlogControls.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import BlogControls from './blogControls';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/BlogControls',
  component: BlogControls,
} as ComponentMeta<typeof BlogControls>;

const common = {
} 

export const Primary: ComponentStory<typeof BlogControls> = (args) => (
    <BlogControls { ...args } />
)

Primary.args = {
  dispatchPreview: () => null,
  dispatchSave: () => null
}

