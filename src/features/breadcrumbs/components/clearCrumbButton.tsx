import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { clearCrumb } from '../breadcrumbsSlice'
import { DivisionLevels } from '../../divisions'

interface ClearButtonProps {
  level: DivisionLevels
  isDisabled: boolean
}

export const ClearCrumbButton = ({ level, isDisabled }: ClearButtonProps) => {
  const dispatch = useAppDispatch()
  const onClick = () => {
    dispatch(clearCrumb(level))
  }
  return <button type="button" className="crumb__clear" onClick={onClick} disabled={isDisabled}>Clear</button>
}
