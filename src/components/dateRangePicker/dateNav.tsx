import { useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { selectFromToDate } from '../../redux/selectors'
import { navRangeForward, navRangeBack } from '../../redux/dateRangeSlice'
import { formatDateText } from '../../utils/dates'
import { Icon } from '../icon'

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

  return (
    <nav className="date-nav">
      <button onClick={onClickBack} className="date-nav__nav-btn"><Icon icon="TriangleLeftIcon" /></button>
      <button onClick={toggleControls} className="date-nav__main">{formatDateText(fromDate)} - {formatDateText(toDate)}</button>
      <button onClick={onClickForward} className="date-nav__nav-btn"><Icon icon="TriangleRightIcon" /></button>
    </nav>
  )
}
