import { useState, ChangeEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'lib/day'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { createDateFromDateString, getTodayAsString } from 'utils/dates'
import { setActiveDate } from '../dateRangeSlice'
import { selectActiveDate } from '../selectors'
import { DATE_DISPLAY_FORMAT, DATE_FORMAT_PATTERN } from '../constants'

export const DateInput = () => {
  const dispatch = useAppDispatch()
  const activeDate = useSelector(selectActiveDate)
  const [input, setInput] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value = '' } = e.target
    setInput(value)

    // update active date (if valid)
    if (DATE_FORMAT_PATTERN.test(value)) {
      const newActiveDate = createDateFromDateString(value)
      dispatch(setActiveDate(newActiveDate.toString()))
    }
  }

  useEffect(() => {
    if (activeDate !== undefined) {
      setInput(dayjs(activeDate).format(DATE_DISPLAY_FORMAT))
    }
  }, [activeDate])

  const onTodayClick = () => {
    dispatch(setActiveDate(getTodayAsString()))
  }

  return (
    <div className="date-input">
      <input type="text" className="date-input__text" value={input} onChange={onChange} aria-label="Active Date" />
      <button type="button" className="date-input__today" onClick={onTodayClick}>Today</button>
    </div>
  )
}
