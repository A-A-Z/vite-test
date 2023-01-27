import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { setWeekRange } from '../../redux/dateRangeSlice'
import { selectWeekRange } from '../../redux/selectors'

const RANGE_OPTIONS = [1, 2, 3, 4]

export const RangeSelect = () => {
  const dispatch = useDispatch<AppDispatch>()
  const range = useSelector(selectWeekRange)
  const setRange = (range: number) => dispatch(setWeekRange(range))

  return (
    <RadioGroup value={range} onChange={setRange}>
      <RadioGroup.Label>Week Range</RadioGroup.Label>
      <ul className="week-range">
        {RANGE_OPTIONS.map(option => (
          <RadioGroup.Option key={`range_${option}`} value={option} as='li'>
            {({ checked }) => (
              <span className={classNames('week-range__option', { 'week-range__option--selected': checked })}>{option} {option === 1 ? 'Week' : 'Weeks'}</span>
            )}
          </RadioGroup.Option>
        ))}
      </ul>
    </RadioGroup>
  )
}
