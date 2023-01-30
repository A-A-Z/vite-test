import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DatePickerProvider } from '@rehookify/datepicker'
import { AppDispatch } from '../../redux/store'
import { setDateRange } from '../../redux/dateRangeSlice'
import { selectActiveDate } from '../../redux/selectors'
import { DateNav } from './dateNav'
import { Calender } from './calender'
import { DateControls } from './dateControls'
import { getTodayAsString } from '../../utils/dates'

export const DateRangePicker = () => {
  const [isControlsOpen, setIsControlsOpen] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const activeDate = useSelector(selectActiveDate)
  const updateActiveDate = (selectedDates: Date[]) => {
    const dateString = (selectedDates.length > 0 && selectedDates[0] !== undefined)
      ? selectedDates[0].toString()
      : getTodayAsString()
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
      <DateNav isControlsOpen={isControlsOpen} setIsControlsOpen={setIsControlsOpen} />
      {isControlsOpen &&
        <div>
          <DateControls />
          <Calender />
        </div>
      }
    </DatePickerProvider>
  )
}
