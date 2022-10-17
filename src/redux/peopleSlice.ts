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
    deleteCancel (state) {
      state.deleteSelected = []
    }
  }
})

// selectors
// export const selectIsDeleteConfirmOpen = (state: PeopleState) => {
//   console.log('test', state.deleteSelected)
//   return true
// }

export const {
  openActionModal,
  closeActionModal,
  deleteConfirm,
  deleteCancel
} = peopleSlice.actions
export default peopleSlice.reducer
