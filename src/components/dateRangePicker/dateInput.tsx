import { useState, ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { AppDispatch } from '../../redux/store'
import { setActiveDate } from '../../redux/dateRangeSlice'
import { selectActiveDate } from '../../redux/selectors'
import { DATE_DISPLAY_FORMAT, DATE_FORMAT_PATTERN } from './constants'
import { createDateFromDateString, getTodayAsString } from '../../utils/dates'

export const DateInput = () => {
  const dispatch = useDispatch<AppDispatch>()
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
      <input type="text" className="date-input__text" value={input} onChange={onChange} />
      <button type="button" className="date-input__today" onClick={onTodayClick}>Today</button>
    </div>
  )
}
