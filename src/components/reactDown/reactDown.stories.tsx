// ReactDown.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import ReactDown from './reactDown';
import { blogPost, imageGallery, mixedList } from './testData';


export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/ReactDown',
  component: ReactDown,
} as ComponentMeta<typeof ReactDown>;

const markdown = `
- hello
- hello

**Bold Text**

| Table  |
| ------ |
| One    |
| Two    |
`;

const common = {
    markdown
} 

const Template: ComponentStory<typeof ReactDown> = (args) => (
     <ReactDown { ...args }>ReactDown</ReactDown>
)

export const StandardMarkdown = Template.bind({})

StandardMarkdown.args = {
    ...common
}

export const BlogExample = Template.bind({});
BlogExample.args = {
    ...common,
    markdown: blogPost
}

export const ImageGallery = Template.bind({});
ImageGallery.args = {
    markdown: imageGallery,
}

export const MixedList = Template.bind({});
MixedList.args = {
    markdown: mixedList
}