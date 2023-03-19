// CreateBlogContent.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import CreateBlogContent from './createBlogContent';
import CreateBlogContentTestWrapper from './createBlogContent';
import { formItems } from './form/formItems';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/CreateBlogContent',
  component: CreateBlogContent,
} as ComponentMeta<typeof CreateBlogContent>;

const common = {
}

const Template: ComponentStory<typeof CreateBlogContent> = (args) => (
	<>
		{console.log(args)}
    <CreateBlogContent { ...args } />
	</>
)

export const Primary = Template.bind({})
Primary.args = {
	formItems
}

export const DefaultValues = Template.bind({})
DefaultValues.args = {
	defaultValues: {
		blogContent: {
			type: 'text',
			value: '# Blog Content'
		},
		title: {
			type: 'text',
			value: 'Hello'
		},
		description: {
			type: 'text',
			value: 'description'
		},
		publish: {
			type: 'checkbox',
			value: true
		},
		url : {
			type: 'text',
			value: 'url'
		},
		image: {
			type: 'text',
			value: 'image-url'
		},
		tags: {
			type: 'multi',
			value: [
				{ id: 'JavaScript', tag: 'JavaScript' },
				{ id: 'PHP', tag: 'PHP' },
			]
		},
	},
	formItems: formItems
}