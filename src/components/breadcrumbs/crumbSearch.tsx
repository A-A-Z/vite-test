import { DivisionLevels } from '../../global/types'

export interface CrumbSearchProps {
  level: DivisionLevels
  parentId: number
}

export const CrumbSearch = ({ level, parentId }: CrumbSearchProps) => {
  return <div>Search { level + parentId }</div>
}
