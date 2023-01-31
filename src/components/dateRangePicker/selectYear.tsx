import { useDatePickerContext, CalendarYear } from '@rehookify/datepicker'
import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { Icon } from '../icon'

dayjs.extend(isBetween)

const filterYears = ({ $date }: CalendarYear): boolean => {
  const start = dayjs().year(2013)
  const end = dayjs().add(3, 'years')
  return dayjs($date).isBetween(start, end, 'year')
}

export const SelectYear = () => {
  const {
    data: { years },
    actions: { setYear }
  } = useDatePickerContext()

  const onYearChange = (newYear: CalendarYear) => {
    setYear(newYear.$date)
  }
  const value = years.find(({ active }) => active) || years[0]

  return (
    <div className="select-lite">
      <Listbox value={value} onChange={onYearChange}>
        <Listbox.Button className="select-lite__btn">
          <div className="select-lite__btn-text">{value.value}</div>
          <Icon icon="CaretSortIcon" />
        </Listbox.Button>
        <Listbox.Options className="select-lite__list">
          {years
            .filter(filterYears)
            .map(yearObj => (
              <Listbox.Option
                key={yearObj.value}
                value={yearObj}
                disabled={yearObj.disabled}
                className={classNames('select-lite__option', { 'select-lite__option--selected': yearObj.active })}
              >
                <div className="select-lite__value">{yearObj.value}</div>
                {yearObj.active && <Icon icon="CheckIcon" />}
              </Listbox.Option>
            ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
