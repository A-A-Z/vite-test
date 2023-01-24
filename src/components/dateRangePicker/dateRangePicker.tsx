import { useState } from 'react'
import { DatePickerProvider } from '@rehookify/datepicker'
import { Calender } from './calender'
import { DateControls } from './date-controls'

export const DateRangePicker = () => {
  const [selectedDates, onDatesChange] = useState<Date[]>([])

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
