import { RootState } from './store'
import { DIVISION_ORDER } from '../global/constants'
// import { BreadcrumbsState } from './breadcrumbsSlice'
import { Divsion, DivisionLevels } from '../global/types'

export const isActionModalOpen = ({ people }: RootState): boolean => people.activePersonId !== null

export const getActiverPerson = ({ people }: RootState): string | null => people.activePersonId

export const selectIsDeleteConfirmOpen = ({ people }: RootState) => people.deleteSelected.length > 0

export const selectDeleteSelected = ({ people }: RootState) => people.deleteSelected

// notices

export const selectNotices = ({ notices }: RootState) => notices.notices

// Divisions

export const selectCrumbs = ({ breadcrumbs: { root, state, client, location } }: RootState) => (
  { root, state, client, location }
)

export const selectDivisionParentId = ({ breadcrumbs }: RootState) => {
  const initialCrumbs = {
    root: 0,
    state: 0,
    client: 0,
    location: 0
  }
  let lastId = 0

  return DIVISION_ORDER.reduce((crumbs, level) => {
    crumbs[level] = lastId

    if (breadcrumbs[level] !== undefined) {
      lastId = breadcrumbs[level]?.id ?? 0
    }

    return crumbs
  }, initialCrumbs)
}

export const selectActiveDivisionLevel = ({ breadcrumbs }: RootState): DivisionLevels | undefined => breadcrumbs.activeLevel

export const selectActiveDivision = (state: RootState): Divsion | undefined => {
  const activeLevel = selectActiveDivisionLevel(state)
  return activeLevel !== undefined ? state.breadcrumbs[activeLevel] : undefined
}
