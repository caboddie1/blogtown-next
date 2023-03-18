// Footer.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Footer from './footer';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;


export const Primary: ComponentStory<typeof Footer> = () => (
     <Footer />
)
