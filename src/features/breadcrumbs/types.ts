import type { DivisionLevels } from 'features/divisions'

export type CrumbFormat = 'select' | 'search'
export interface CrumbType {
  level: DivisionLevels
  label: string
  format: CrumbFormat
}

export interface CrumbListingProps {
  isOpen: boolean
}
