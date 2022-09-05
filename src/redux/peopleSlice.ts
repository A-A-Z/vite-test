import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Person } from '../global/types'

interface PeopleState {
  value: number
  activePerson: Person | null
}

const initialState: PeopleState = {
  value: 0,
  activePerson: null
}

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    // incremented(state) {
    //   // it's okay to do this because immer makes it immutable
    //   // under the hood
    //   state.value++;
    // },
    // amountAdded(state, action: PayloadAction<number>) {
    //   state.value += action.payload;
    openActionModal (state, action: PayloadAction<Person>) {
      state.activePerson = action.payload
    },

    closeActionModal (state) {
      state.activePerson = null
    }
    // decrement
    // reset
  }
})

export const { openActionModal, closeActionModal } = peopleSlice.actions
export default peopleSlice.reducer
