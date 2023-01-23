import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { clearCrumb } from '../../redux/breadcrumbsSlice'
import { DivisionLevels } from '../../global/types'

interface ClearButtonProps {
  level: DivisionLevels
  isDisabled: boolean
}

export const ClearCrumbButton = ({ level, isDisabled }: ClearButtonProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const onClick = () => {
    dispatch(clearCrumb(level))
  }
  return <button type="button" className="crumb__clear" onClick={onClick} disabled={isDisabled}>Clear</button>
}
