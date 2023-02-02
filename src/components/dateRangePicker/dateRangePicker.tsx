import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DatePickerProvider } from '@rehookify/datepicker'
import { AppDispatch } from '../../redux/store'
import { setActiveDate } from '../../redux/dateRangeSlice'
import { selectActiveDate } from '../../redux/selectors'
import { DateNav } from './dateNav'
import { Calender } from './calender'
import { DateControls } from './dateControls'
import { getTodayAsString } from '../../utils/dates'
import { RangeSelect } from './rangeSelect'
import { DateInput } from './dateInput'
import './assets/style/index.scss'

export const DateRangePicker = () => {
  const [isControlsOpen, setIsControlsOpen] = useState(false)
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
    >
      <div className="date-range-picker">
        <div className="date-range-picker__nav">
          <DateNav isControlsOpen={isControlsOpen} setIsControlsOpen={setIsControlsOpen} />
        </div>
        {isControlsOpen &&
          <div className="date-range-picker__control-panel">
            <DateControls />
            <Calender />
            <DateInput />
            <RangeSelect />
          </div>
        }
      </div>
    </DatePickerProvider>
  )
}
