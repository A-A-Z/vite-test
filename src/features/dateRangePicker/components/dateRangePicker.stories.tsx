import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import { DateRangePicker } from './dateRangePicker'
import '../../../assets/style/app.scss'

export default {
  title: 'Features/DateRangePicker/DateRangePicker',
  component: DateRangePicker
} as ComponentMeta<typeof DateRangePicker>

const Template: ComponentStory<typeof DateRangePicker> = () => (
  <Provider store={store}>
    <DateRangePicker />
  </Provider>
)

export const Default = Template.bind({})
