import { useDispatch, useSelector } from 'react-redux'
import { DatePickerProvider } from '@rehookify/datepicker'
import { AppDispatch } from '../../../redux/store'
import { setActiveDate } from '../dateRangeSlice'
import { selectActiveDate } from '../selectors'
import { getTodayAsString } from '../../../utils/dates'

interface DateRangePickerProviderProps {
  children: JSX.Element
}

export const DateRangePickerProvider = ({ children }: DateRangePickerProviderProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const activeDate = useSelector(selectActiveDate)
  const updateActiveDate = (selectedDates: Date[]) => {
    const dateString = (selectedDates.length > 0 && selectedDates[0] !== undefined)
      ? selectedDates[0].toString()
      : getTodayAsString()
    dispatch(setActiveDate(dateString))
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
        },
        years: {
          mode: 'fluid',
          numberOfYears: 30
        }
      }}
    >{children}</DatePickerProvider>
  )
}
