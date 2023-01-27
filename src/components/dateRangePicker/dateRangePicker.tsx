import { useDispatch, useSelector } from 'react-redux'
import { DatePickerProvider } from '@rehookify/datepicker'
import { AppDispatch } from '../../redux/store'
import { setDateRange } from '../../redux/dateRangeSlice'
import { selectActiveDate } from '../../redux/selectors'
import { Calender } from './calender'
import { DateControls } from './dateControls'

export const DateRangePicker = () => {
  const dispatch = useDispatch<AppDispatch>()
  const activeDate = useSelector(selectActiveDate)
  const updateActiveDate = (selectedDates: Date[]) => {
    const dateString = (selectedDates.length > 0 && selectedDates[0] !== undefined)
      ? selectedDates[0].toString()
      : undefined
    dispatch(setDateRange(dateString))
  }

  return (
    <DatePickerProvider
      config={{
        selectedDates: (activeDate !== undefined ? [activeDate] : undefined),
        onDatesChange: updateActiveDate,
        dates: { mode: 'single' },
        locale: {
          locale: 'en-AU',
          day: '2-digit',
          year: 'numeric',
          weekday: 'short',
          monthName: 'long'
        },
        calendar: {
          startDay: 1
        }
      }}
    >
      <DateControls />
      <Calender />
    </DatePickerProvider>
  )
}
