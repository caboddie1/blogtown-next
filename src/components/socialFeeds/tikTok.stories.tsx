// TikTok.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import TikTok from './tikTok';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/TikTok',
  component: TikTok,
} as ComponentMeta<typeof TikTok>;


export const Primary: ComponentStory<typeof TikTok> = () => (
     <TikTok />
)

