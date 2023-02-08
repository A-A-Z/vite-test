
import { RootState } from '../../redux/store'
import { Divsion, DivisionLevels, DIVISION_ORDER } from '../divisions'

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
