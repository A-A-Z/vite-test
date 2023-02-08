import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { setWeekRange } from '../dateRangeSlice'
import { selectFromToDate } from '../selectors'
import { Icon } from 'components/icon'
import { RANGE_OPTIONS } from '../constants'
import type { DateRangeOption } from '../types'
import dayjs from 'lib/day'

const createOptionText = ({ length, label = '' }: DateRangeOption): string => (
  label !== '' ? label : `${length} ${length === 1 ? 'Week' : 'Weeks'}`
)

const createHintText = (startDate: Date, range: number): JSX.Element => {
  const fromText = dayjs(startDate).format('Do MMM')
  const toDate = dayjs(startDate).add((7 * range) - 1, 'day').format('Do MMM')
  return <>{fromText} <Icon icon="CaretRightIcon" /> {toDate}</>
}

export const RangeSelect = () => {
  const dispatch = useAppDispatch()
  const [from, , range] = useSelector(selectFromToDate)
  const setRange = useCallback((range: number) => dispatch(setWeekRange(range)), [])

  return (
    <RadioGroup value={range} onChange={setRange} className="week-range">
      <ul className="week-range__list">
        {RANGE_OPTIONS.map(option => (
          <RadioGroup.Option
            key={`range_${option.length}`}
            value={option.length}
            as="li"
            tabIndex={0}
            className="week-range__item"
          >
            {({ checked }) => (
              <span className={classNames('week-range__option', { 'week-range__option--selected': checked })}>
                {createOptionText(option)}
                <span className="week-range__option-hint">{createHintText(from, option.length)}</span>
              </span>
            )}
          </RadioGroup.Option>
        ))}
      </ul>
    </RadioGroup>
  )
}
