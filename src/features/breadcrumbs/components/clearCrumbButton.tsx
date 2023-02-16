import { useAppDispatch } from 'hooks/useAppDispatch'
import type { DivisionLevels } from 'features/divisions'
import { Icon } from 'components/icon'
import { clearCrumb } from '../breadcrumbsSlice'

interface ClearButtonProps {
  level: DivisionLevels
  isDisabled: boolean
}

export const ClearCrumbButton = ({ level, isDisabled }: ClearButtonProps) => {
  const dispatch = useAppDispatch()
  const onClick = () => {
    dispatch(clearCrumb(level))
  }
  return <button type="button" className="crumb__clear" onClick={onClick} disabled={isDisabled}><Icon icon="Cross1Icon" /></button>
}
