import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PeopleState {
  activePersonId: string | null
}

const initialState: PeopleState = {
  activePersonId: null
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
    }
  }
})

export const { openActionModal, closeActionModal } = peopleSlice.actions
export default peopleSlice.reducer
