import { useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { selectFromToDate } from '../selectors'
import { navRangeForward, navRangeBack } from '../dateRangeSlice'
import { formatDateText } from 'utils/dates'
import { Icon } from 'components/icon'

interface DateNavProps {
  isControlsOpen: boolean
  setIsControlsOpen: (isOpen: boolean) => void
}

export const DateNav = ({ isControlsOpen, setIsControlsOpen }: DateNavProps) => {
  const dispatch = useAppDispatch()
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
      <button
        type="button"
        onClick={onClickBack}
        className="date-nav__btn date-nav__nav"
        aria-label="Previous Month"
      >
        <Icon icon="TriangleLeftIcon" />
      </button>
      <button
        type="button"
        onClick={toggleControls}
        className="date-nav__btn date-nav__main"
        aria-expanded={isControlsOpen}
        aria-controls="date-range-control-panel"
      >
        <span>{formatDateText(fromDate)} <Icon icon="CaretRightIcon" /> {formatDateText(toDate)}</span>
        <span>({range} weeks)</span>
      </button>
      <button
        type="button"
        onClick={onClickForward}
        className="date-nav__btn date-nav__nav"
        aria-label="Next Month"
      >
        <Icon icon="TriangleRightIcon" />
      </button>
    </nav>
  )
}
