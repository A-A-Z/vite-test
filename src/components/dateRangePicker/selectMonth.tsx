import { useDatePickerContext, CalendarMonth } from '@rehookify/datepicker'
import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import { Icon } from '../icon'

export const SelectMonth = () => {
  const {
    data: { months },
    actions: { setMonth }
  } = useDatePickerContext()

  const onMonthChange = (date: CalendarMonth) => {
    setMonth(date.$date)
  }
  const value = months.find(({ active }) => active)

  return (
    <div className="select-lite">
      <Listbox value={value} onChange={onMonthChange}>
        <Listbox.Button className="select-lite__btn">
          <div className="select-lite__btn-text">{value?.name}</div>
          <Icon icon="CaretSortIcon" />
        </Listbox.Button>
        <Listbox.Options className="select-lite__list">
          {months.map((month) => (
            <Listbox.Option
              key={month.name}
              value={month}
              disabled={month.disabled}
              className={classNames('select-lite__option', { 'select-lite__option--selected': month.active })}
            >
              <div className="select-lite__value">{month.name}</div>
              {month.active && <Icon icon="CheckIcon" />}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
