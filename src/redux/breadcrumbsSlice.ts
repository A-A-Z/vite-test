import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Divsion, DivisionLevels } from '../global/types'

export interface BreadcrumbsState {
  root?: Divsion
  state?: Divsion
  client?: Divsion
  location?: Divsion
}

const initialState: BreadcrumbsState = {
  root: undefined,
  state: undefined,
  client: undefined,
  location: undefined
}

interface SetCrumbAction {
  level: DivisionLevels
  value: Divsion
}

interface SetCrumbsAction {
  root?: Divsion
  state?: Divsion
  client?: Divsion
  location?: Divsion
}

const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    setCrumb (state, action: PayloadAction<SetCrumbAction>) {
      const { level, value } = action.payload
      state[level] = value
    },
    setCrumbs (state, action: PayloadAction<SetCrumbsAction>) {
      Object.entries(action.payload).forEach(([level, value]) => {
        state[level as DivisionLevels] = value
      })
    }
  }
})

export const {
  setCrumb,
  setCrumbs
} = breadcrumbsSlice.actions
export default breadcrumbsSlice.reducer
