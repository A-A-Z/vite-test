import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { setWeekRange } from '../../redux/dateRangeSlice'
import { selectWeekRange } from '../../redux/selectors'

export interface DateRangeOption {
  length: number
  label?: string
}

const RANGE_OPTIONS: DateRangeOption[] = [
  { length: 1 },
  { length: 2, label: 'Fortnight' },
  { length: 3 },
  { length: 4 }
]

const createOptionText = ({ length, label = '' }: DateRangeOption) => {
  if (label !== '') {
    return label
  }

  return `${length} ${length === 1 ? 'Week' : 'Weeks'}`
}

export const RangeSelect = () => {
  const dispatch = useDispatch<AppDispatch>()
  const range = useSelector(selectWeekRange)
  const setRange = useCallback((range: number) => dispatch(setWeekRange(range)), [])

  return (
    <RadioGroup value={range} onChange={setRange}>
      <ul className="week-range">
        {RANGE_OPTIONS.map(option => (
          <RadioGroup.Option key={`range_${option.length}`} value={option.length} as='li'>
            {({ checked }) => (
              <span className={classNames('week-range__option', { 'week-range__option--selected': checked })}>{createOptionText(option)}</span>
            )}
          </RadioGroup.Option>
        ))}
      </ul>
    </RadioGroup>
  )
}
