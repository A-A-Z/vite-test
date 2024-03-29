import { useEffect } from 'react'
import { useDatePickerContext } from '@rehookify/datepicker'
import { useSelector } from 'react-redux'
import { bemNames } from 'lib/className'
import dayjs from 'lib/day'
import { selectWeekRange } from '../selectors'

const isActiveWeek = (date: Date, activeDate: Date, range: number): boolean => {
  const start = dayjs(activeDate).weekday(-1)
  const end = dayjs(activeDate).weekday(7 * range)
  return dayjs(date).isBetween(start, end, 'hour')
}

export const Calender = () => {
  const {
    data: { weekDays, calendars, selectedDates },
    propGetters: { dayButton },
    actions: { setMonth }
  } = useDatePickerContext()
  const { days, month, year } = calendars[0]
  const weekDate = useSelector(selectWeekRange)
  const [activeDate = new Date()] = selectedDates
  const activeMonth = activeDate.toLocaleString('default', { month: 'long' })
  const activeYear = activeDate.toLocaleString('default', { year: 'numeric' })

  useEffect(() => {
    if (month !== activeMonth || year !== activeYear) {
      setMonth(activeDate)
    }
  }, [activeMonth, activeYear])

  return (
    <ul className="calendar">
      {weekDays.map(weekday => {
        return <li key={weekday} className="calendar__date calendar__date--header">{weekday}</li>
      })}
      {days.map(dpDay => {
        const { date, day, inCurrentMonth, isToday, $date } = dpDay
        const { onClick } = dayButton(dpDay)
        const isInActiveRange = isActiveWeek($date, activeDate, weekDate)
        return <li
          key={date}
          className={bemNames('calendar__date', {
            'outside-month': !inCurrentMonth,
            today: isToday,
            selected: isInActiveRange
          })}
          onClick={onClick}
          role="button"
          tabIndex={0}
          aria-pressed={isInActiveRange}
        >{day}</li>
      })}
    </ul>
  )
}
