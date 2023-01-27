import { useState, useEffect } from 'react'
import { DatePickerProvider } from '@rehookify/datepicker'
import { Calender } from './calender'
import { DateControls } from './dateControls'

export const DateRangePicker = () => {
  const [selectedDates, onDatesChange] = useState<Date[]>([])

  // useEffect(() => {
  //   console.log('update', selectedDates)
  // }, selectedDates)

  return (
    <DatePickerProvider
      config={{
        selectedDates,
        onDatesChange,
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
