import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PersonSimple } from '../global/types'

interface PeopleState {
  activePersonId: string | null
  deleteSelected: PersonSimple[]
}

const initialState: PeopleState = {
  activePersonId: null,
  deleteSelected: []
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
      // TODO some error handling
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
