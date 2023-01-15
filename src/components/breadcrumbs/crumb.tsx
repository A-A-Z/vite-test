import { Divsion, DivisionLevels } from '../../global/types'
import { CrumbSelect } from './crumbSelect'
import { CrumbSearch } from './crumbSearch'

export interface CrumbType {
  name: DivisionLevels
  label: string
  type: 'select' | 'search'
  value?: Divsion
  parentId?: number
}

export const Crumb = ({ name, label, value, type, parentId }: CrumbType) => {
  return (
    <div className="crumb">
      <div className="crumb__label">{label}</div>
      <div className="crumb__value">{value?.name || 'none'} {parentId}</div>
      {type === 'search' ? <CrumbSearch level={name} parentId={parentId ?? 0} /> : <CrumbSelect level={name} parentId={parentId ?? 0} />}
    </div>
  )
}
