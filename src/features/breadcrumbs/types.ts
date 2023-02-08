import type { DivisionLevels } from '../divisions'

export interface CrumbType {
  name: DivisionLevels
  label: string
  type: 'select' | 'search'
}

export interface CrumbListingProps {
  level: DivisionLevels
  parentId: number
  selected?: number
  isOpen: boolean
}
