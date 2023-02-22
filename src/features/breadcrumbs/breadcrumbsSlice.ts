import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Division, DivisionLevels, DivisionDataObject, DIVISION_ORDER } from 'features/divisions'

const formatDivisionAncestor = (data: DivisionDataObject, level: DivisionLevels): Division | undefined => {
  const { ancestor, breadcrumb } = data
  const levelAncestor = ancestor[level]

  if (levelAncestor === undefined || levelAncestor.id === '') {
    return undefined
  }

  return { ...levelAncestor, level, breadcrumb } as Division
}

export interface BreadcrumbsState {
  root?: Division
  state?: Division
  client?: Division
  location?: Division
  activeLevel?: DivisionLevels
}

const initialState: BreadcrumbsState = {
  root: undefined,
  state: undefined,
  client: undefined,
  location: undefined,
  activeLevel: undefined
}

interface SetCrumbsAction {
  root?: Division
  state?: Division
  client?: Division
  location?: Division
  activeLevel: DivisionLevels
}

const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    setCrumbs (state, action: PayloadAction<SetCrumbsAction>) {
      const { activeLevel, ...divsions } = action.payload

      Object.entries(divsions).forEach(([level, value]) => {
        state[level as DivisionLevels] = value
      })
      state.activeLevel = activeLevel
    },
    setCrumbsFromDivision (state, action: PayloadAction<DivisionDataObject>) {
      const { payload: division } = action

      DIVISION_ORDER.forEach(level => {
        state[level] = formatDivisionAncestor(division, level)
      })

      state.activeLevel = division.level
    },
    clearCrumb (state, action: PayloadAction<DivisionLevels>) {
      const levelIndex = DIVISION_ORDER.indexOf(action.payload)
      const clearLevels = DIVISION_ORDER.slice(levelIndex)
      clearLevels.forEach(level => {
        state[level] = undefined
      })
      state.activeLevel = DIVISION_ORDER[levelIndex - 1]
    }
  }
})

export const {
  setCrumbs,
  setCrumbsFromDivision,
  clearCrumb
} = breadcrumbsSlice.actions
export default breadcrumbsSlice.reducer
