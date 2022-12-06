import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PersonSimple } from '../global/types'

export interface PeopleState {
  activePersonId: string | null
  deleteSelected: PersonSimple[]
  isFormLoading: boolean
}

const initialState: PeopleState = {
  activePersonId: null,
  deleteSelected: [],
  isFormLoading: false
}

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    openActionModal (state, action: PayloadAction<string | null>) {
      state.activePersonId = action.payload
    },
    closeActionModal (state) {
      state.activePersonId = null
    },
    deleteConfirm (state, action: PayloadAction<PersonSimple[]>) {
      state.deleteSelected = action.payload
    },
    deleteError (state) {
      state.deleteSelected = []
    },
    deleteClose (state) {
      state.deleteSelected = []
    }
  }
})

export const {
  openActionModal,
  closeActionModal,
  deleteConfirm,
  deleteError,
  deleteClose
} = peopleSlice.actions
export default peopleSlice.reducer
