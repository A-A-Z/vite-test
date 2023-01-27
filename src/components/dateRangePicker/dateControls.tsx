import { useDatePickerContext } from '@rehookify/datepicker'
import { Icon } from '../icon'
import { SelectMonth } from './selectMonth'
import { RangeSelect } from './rangeSelect'

export const DateControls = () => {
  const {
    data: { calendars, months },
    propGetters: {
      previousMonthButton,
      nextMonthButton,
      previousYearsButton,
      nextYearsButton
    },
    actions: { setMonth }
  } = useDatePickerContext()
  const { year } = calendars[0]

  return (
    <>
      <div className="date-control">
        <button className="date-control__nav-btn" {...previousYearsButton()}><Icon icon="CaretLeftIcon" /></button>
        {year}
        <button className="date-control__nav-btn" {...nextYearsButton()}><Icon icon="CaretRightIcon" /></button>
      </div>
      <div className="date-control">
        <button className="date-control__nav-btn" {...previousMonthButton()}><Icon icon="CaretLeftIcon" /></button>
        <SelectMonth months={months} setMonth={setMonth} />
        <button className="date-control__nav-btn" {...nextMonthButton()}><Icon icon="CaretRightIcon" /></button>
      </div>
      <RangeSelect />
    </>
  )
}
