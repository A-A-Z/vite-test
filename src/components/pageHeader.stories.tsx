import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PageHeader } from './pageHeader';

export default {
    title: 'Components/PageHeader',
    component: PageHeader,
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => <PageHeader {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: 'Welcome to my story!'
}
