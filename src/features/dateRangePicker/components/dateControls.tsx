import { useDatePickerContext } from '@rehookify/datepicker'
import { Icon } from '../../../components/icon'
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
        <button className="date-control__nav-btn" aria-label="Previous Month" {...previousMonthButton()}>
          <Icon icon="TriangleLeftIcon" />
        </button>
        <SelectMonth />
        <SelectYear />
        <button className="date-control__nav-btn" aria-label="Next Month" {...nextMonthButton()}>
          <Icon icon="TriangleRightIcon" />
        </button>
      </div>
  )
}
