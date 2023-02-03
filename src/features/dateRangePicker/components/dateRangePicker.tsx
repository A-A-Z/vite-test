import { useState } from 'react'
import { DateRangePickerProvider } from './dateRangePickerProvider'
import { DateNav } from './dateNav'
import { Calender } from './calender'
import { DateControls } from './dateControls'
import { RangeSelect } from './rangeSelect'
import { DateInput } from './dateInput'
import '../assets/style/index.scss'

export const DateRangePicker = () => {
  const [isControlsOpen, setIsControlsOpen] = useState(false)
  return (
    <DateRangePickerProvider>
      <div className="date-range-picker">
        <div className="date-range-picker__nav">
          <DateNav isControlsOpen={isControlsOpen} setIsControlsOpen={setIsControlsOpen} />
        </div>
        {isControlsOpen &&
          <div id="date-range-control-panel" className="date-range-picker__control-panel">
            <DateControls />
            <Calender />
            <DateInput />
            <RangeSelect />
          </div>
        }
      </div>
    </DateRangePickerProvider>
  )
}
