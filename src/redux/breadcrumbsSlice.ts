import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Divsion, DivisionLevels } from '../global/types'

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
    }
  }
})

export const {
  setCrumbs
} = breadcrumbsSlice.actions
export default breadcrumbsSlice.reducer
