import { DivisionLevels } from '../../global/types'

export interface CrumbListingProps {
  level: DivisionLevels
  parentId: number
  selected: number | undefined
  activeLevel: DivisionLevels
  isActive: boolean
}
