import classNames from 'classnames'
import { Divsion, DivisionLevels } from '../../global/types'
import { CrumbSelect } from './crumbSelect'
import { CrumbSearch } from './crumbSearch'
import { ClearCrumbButton } from './clearCrumbButton'

export interface CrumbProps {
  name: DivisionLevels
  label: string
  type: 'select' | 'search'
  value?: Divsion
  parentId?: number
  isActive: boolean
}

export const Crumb = ({ name, label, value, type, parentId, isActive }: CrumbProps) => {
  const CrumbListing = type === 'search' ? CrumbSearch : CrumbSelect
  return (
    <div className={classNames('crumb', { 'crumb--active': isActive, 'crumb--unset': value === undefined })}>
      <div className="crumb__label">{label}</div>
      <div className="crumb__value">{value?.name || 'none'} / {parentId}</div>
      <ClearCrumbButton level={name} isDisabled={value === undefined} />
      <CrumbListing level={name} parentId={parentId ?? 0} selected={value?.id} />
    </div>
  )
}
