import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import { NoticeItem } from './noticeItem'
import '../assets/style/app.scss'

export default {
  title: 'Components/Notice',
  component: NoticeItem,
  argTypes: {
    id: {
      table: {
        readonly: true
      }
    },
    type: {
      options: ['info', 'success', 'warning'],
      control: { type: 'radio' }
    }
  }
} as ComponentMeta<typeof NoticeItem>

const Template: ComponentStory<typeof NoticeItem> = (args) => (
  <Provider store={store}>
    <div style={{ width: '240px' }}>
      <NoticeItem {...args} />
    </div>
  </Provider>
)

export const Info = Template.bind({})

Info.args = {
  id: '1',
  title: 'Info Notice Title',
  body: 'Something has happened.',
  type: 'info'
}

export const Success = Template.bind({})

Success.args = {
  id: '2',
  title: 'Good Job',
  body: 'Everything has worked out just fine.',
  type: 'success'
}

export const Warning = Template.bind({})

Warning.args = {
  id: '3',
  title: 'Fire!',
  body: 'Everything is on Fire!',
  type: 'warning'
}
