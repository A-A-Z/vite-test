import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import { Calender } from './calender'
import { DateRangePickerProvider } from './dateRangePickerProvider'
import '../../../assets/style/app.scss'
import '../assets/style/index.scss'

export default {
  title: 'Features/DateRangePicker/Calender',
  component: Calender
} as ComponentMeta<typeof Calender>

const Template: ComponentStory<typeof Calender> = () => (
  <Provider store={store}>
    <DateRangePickerProvider>
      <Calender />
    </DateRangePickerProvider>
  </Provider>
)

export const Default = Template.bind({})
