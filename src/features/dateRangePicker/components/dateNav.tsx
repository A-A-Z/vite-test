import { useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { selectFromToDate } from '../selectors'
import { navRangeForward, navRangeBack } from '../dateRangeSlice'
import { formatDateText } from '../../../utils/dates'
import { Icon } from '../../../components/icon'

interface DateNavProps {
  isControlsOpen: boolean
  setIsControlsOpen: (isOpen: boolean) => void
}

export const DateNav = ({ isControlsOpen, setIsControlsOpen }: DateNavProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [fromDate, toDate, range] = useSelector(selectFromToDate, shallowEqual)

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
      <button onClick={onClickBack} className="date-nav__btn date-nav__nav"><Icon icon="TriangleLeftIcon" /></button>
      <button onClick={toggleControls} className="date-nav__btn date-nav__main">
        <span>{formatDateText(fromDate)} <Icon icon="CaretRightIcon" /> {formatDateText(toDate)}</span>
        <span>({range} weeks)</span>
      </button>
      <button onClick={onClickForward} className="date-nav__btn date-nav__nav"><Icon icon="TriangleRightIcon" /></button>
    </nav>
  )
}
