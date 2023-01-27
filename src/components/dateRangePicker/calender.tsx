import { useDatePickerContext } from '@rehookify/datepicker'
import dayjs from 'dayjs'
import classNames from 'classnames'
import updateLocale from 'dayjs/plugin/updateLocale'
import weekday from 'dayjs/plugin/weekday'
import isBetween from 'dayjs/plugin/isBetween'

// var isBetween = require('dayjs/plugin/isBetween')
// import isoWeek from 'dayjs/plugin/isoWeek'
// import 'dayjs/locale/uk'

// dayjs.locale('au')
// dayjs.extend(isoWeek)

// var weekday = require('dayjs/plugin/weekday')
dayjs.extend(weekday)
dayjs.extend(isBetween)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', { weekStart: 1 })

const isActiveWeek = (date: Date, activeDate: Date): boolean => {
  if (activeDate === undefined) {
    return false
  }

  // const thisDate = dayjs(date)
  const start = dayjs(activeDate).weekday(-1)
  const end = dayjs(activeDate).weekday(7 * 3)
  // console.log(dayjs(date).format('DD/MM'), start.format('DD/MM'), end.format('DD/MM'))
  return dayjs(date).isBetween(start, end, 'hour')

  // return true
}

export const Calender = () => {
  const {
    data: { weekDays, calendars, selectedDates },
    propGetters: { dayButton }
  } = useDatePickerContext()
  const { days } = calendars[0]

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
        // console.log(date, isActiveWeek($date, activeDate))
        const isInActiveRange = isActiveWeek($date, activeDate)
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
