import { useDatePickerContext } from '@rehookify/datepicker'
import { Icon } from '../icon'
import { SelectMonth } from './selectMonth'
import { SelectYear } from './selectYear'

export const DateControls = () => {
  const {
    propGetters: {
      previousMonthButton,
      nextMonthButton
    }
  } = useDatePickerContext()

  return (
      <div className="date-control">
        <button className="date-control__nav-btn" {...previousMonthButton()}><Icon icon="CaretLeftIcon" /></button>
        <SelectMonth />
        <SelectYear />
        <button className="date-control__nav-btn" {...nextMonthButton()}><Icon icon="CaretRightIcon" /></button>
      </div>
  )
}
