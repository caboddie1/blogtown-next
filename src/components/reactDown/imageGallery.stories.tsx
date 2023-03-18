// ImageGallery.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import ImageGallery from './imageGallery';
import { images } from './testData';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/ImageGallery',
  component: ImageGallery,
} as ComponentMeta<typeof ImageGallery>;

const common = {
    images
} 

export const Primary: ComponentStory<typeof ImageGallery> = (args) => (
     <ImageGallery { ...args }>ImageGallery</ImageGallery>
)

Primary.args = {
    ...common
}