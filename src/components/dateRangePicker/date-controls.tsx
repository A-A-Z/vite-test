import { useDatePickerContext, CalendarMonth } from '@rehookify/datepicker'
import { Listbox } from '@headlessui/react'
import { Icon } from '../icon'

interface SelectMonthProps {
  months: CalendarMonth[]
  setMonth: (d: Date) => void
}

const SelectMonth = ({ months, setMonth }: SelectMonthProps) => {
  // const onMonthChange = (date: Date) => { setMonth(date) }
  const onMonthChange = (date: CalendarMonth) => {
    setMonth(date.$date)
  }
  // const value = months.find(month => month.selected)
  const value = months.find(({ active }) => active)
  // console.log('value', value)
  return (
    <Listbox value={value} onChange={onMonthChange}>
      <Listbox.Button>{value?.name}</Listbox.Button>
      <Listbox.Options>
        {months.map((month) => (
          <Listbox.Option
            key={month.name}
            value={month}
            disabled={month.disabled}
          >
            {month.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

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
    </>
  )
}
