import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { selectFromToDate } from '../../redux/selectors'
import { navRangeForward, navRangeBack } from '../../redux/dateRangeSlice'
import { formatDateText } from '../../utils/dates'
import { useCallback } from 'react'

interface DateNavProps {
  isControlsOpen: boolean
  setIsControlsOpen: (isOpen: boolean) => void
}

export const DateNav = ({ isControlsOpen, setIsControlsOpen }: DateNavProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [fromDate, toDate] = useSelector(selectFromToDate, shallowEqual)

  const onClickForward = () => {
    dispatch(navRangeForward())
  }
  const onClickBack = () => {
    dispatch(navRangeBack())
  }

  const toggleControls = useCallback(() => {
    setIsControlsOpen(!isControlsOpen)
  }, [isControlsOpen])

  return <nav>
    <button onClick={onClickBack}>Back</button>
    <span>{formatDateText(fromDate)} - {formatDateText(toDate)}</span>
    <button onClick={onClickForward}>Forward</button>
    <button onClick={toggleControls}>{isControlsOpen ? 'close' : 'open'}</button>
  </nav>
}
