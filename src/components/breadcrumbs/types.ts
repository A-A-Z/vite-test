import { DivisionLevels } from '../../global/types'

export interface CrumbListingProps {
  level: DivisionLevels
  parentId: number
  selected?: number
  isOpen: boolean
}
