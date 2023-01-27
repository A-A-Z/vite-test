import { useDatePickerContext } from '@rehookify/datepicker'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import classNames from 'classnames'
import updateLocale from 'dayjs/plugin/updateLocale'
import weekday from 'dayjs/plugin/weekday'
import isBetween from 'dayjs/plugin/isBetween'
import { selectWeekRange } from '../../redux/selectors'

dayjs.extend(weekday)
dayjs.extend(isBetween)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', { weekStart: 1 })

const isActiveWeek = (date: Date, activeDate: Date, range: number): boolean => {
  if (activeDate === undefined) {
    return false
  }

  // const thisDate = dayjs(date)
  const start = dayjs(activeDate).weekday(-1)
  const end = dayjs(activeDate).weekday(7 * range)
  // console.log(dayjs(date).format('DD/MM'), start.format('DD/MM'), end.format('DD/MM'))
  return dayjs(date).isBetween(start, end, 'hour')
}

export const Calender = () => {
  const {
    data: { weekDays, calendars, selectedDates },
    propGetters: { dayButton }
  } = useDatePickerContext()
  const { days } = calendars[0]

  const weekDate = useSelector(selectWeekRange)

  const [activeDate] = selectedDates
  // console.log('selectedDates', activeDate)
  // console.log(dayjs.locale().fi .localeData().firstDayOfWeek())

  // if (activeDate !== undefined) {
  //   const start = dayjs(activeDate).weekday(0)
  //   const end = dayjs(activeDate).weekday(6)
  //   console.log(start.format('DD/MM'), end.format('DD/MM'))
  // }

  return (
    <ul className="calendar">
      {weekDays.map(weekday => {
        return <li key={weekday} className="calendar__date calendar__date--header">{weekday}</li>
      })}
      {days.map(dpDay => {
        const { date, day, inCurrentMonth, isToday, /* selected, */ $date } = dpDay
        const { onClick } = dayButton(dpDay)
        const isInActiveRange = isActiveWeek($date, activeDate, weekDate)
        return <li
          key={date}
          className={classNames(
            'calendar__date',
            {
              'calendar__date--outside-month': !inCurrentMonth,
              'calendar__date--today': isToday,
              'calendar__date--selected': isInActiveRange
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
