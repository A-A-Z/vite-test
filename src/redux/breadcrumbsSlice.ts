import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Divsion, DivisionLevels } from '../global/types'
import { DIVISION_ORDER } from '../global/constants'

export interface BreadcrumbsState {
  root?: Divsion
  state?: Divsion
  client?: Divsion
  location?: Divsion
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
  root?: Divsion
  state?: Divsion
  client?: Divsion
  location?: Divsion
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
    clearCrumb (state, action: PayloadAction<DivisionLevels>) {
      const levelIndex = DIVISION_ORDER.indexOf(action.payload)
      const clearLevels = DIVISION_ORDER.slice(levelIndex)
      clearLevels.forEach(level => {
        state[level] = undefined
      })
    }
  }
})

export const {
  setCrumbs,
  clearCrumb
} = breadcrumbsSlice.actions
export default breadcrumbsSlice.reducer
