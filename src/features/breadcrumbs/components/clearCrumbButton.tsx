import { Icon } from 'components/icon'
import { useBreadcrumb } from '../hooks/useBreadcrumb'

interface ClearButtonProps {
  isDisabled: boolean
}

export const ClearCrumbButton = ({ isDisabled }: ClearButtonProps) => {
  const { clearThisCrumb } = useBreadcrumb()
  return (
    <button
      type="button"
      className="crumb__clear"
      onClick={clearThisCrumb}
      disabled={isDisabled}
    ><Icon icon="Cross1Icon" /></button>
  )
}
