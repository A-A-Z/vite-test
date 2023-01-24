import { useDatePickerContext } from '@rehookify/datepicker'
import classNames from 'classnames'

export const Calender = () => {
  const {
    data: { weekDays, calendars, months },
    propGetters: { dayButton }
  } = useDatePickerContext()
  const { days } = calendars[0]
  console.log(months)
  return (
    <ul className="calendar">
      {weekDays.map(weekday => {
        return <li key={weekday} className="calendar__date calendar__date--header">{weekday}</li>
      })}
      {days.map(dpDay => {
        const { date, day, inCurrentMonth, isToday, selected } = dpDay
        const { onClick } = dayButton(dpDay)
        return <li
          key={date}
          className={classNames(
            'calendar__date',
            {
              'calendar__date--outside-month': !inCurrentMonth,
              'calendar__date--today': isToday,
              'calendar__date--selected': selected
            }
          )}
          onClick={onClick}
          role="button"
          tabIndex={0}
        >{day}</li>
      })}
    </ul>
  )
}
