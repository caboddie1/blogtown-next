// Loading.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from './loading';
import LoadingTest from './loadingTest';


export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const Primary: ComponentStory<typeof Loading> = (args) => (
    <div style={{ height: 400, width: 1200 }} className="border">
        <Loading { ...args }>
            <div>Some content</div>
        </Loading>
    </div>
)

Primary.args = {
    isLoading: true
}

export const LoadingWrapper: ComponentStory<typeof Loading> = (args) => (
    <LoadingTest />
)