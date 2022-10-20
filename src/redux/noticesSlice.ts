import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface notice {
  id: string
  title: string
}

interface NoticesState {
  notices: notice[]
}

const initialState: NoticesState = {
  notices: []
}

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    addNotice (state, action: PayloadAction<notice>) {
      state.notices = [...state.notices, action.payload]
    },
    removeNotice (state, action: PayloadAction<string>) {
      state.notices = state.notices.filter(({ id }) => id === action.payload)
    }
  }
})

export const {
  addNotice,
  removeNotice
} = noticesSlice.actions
export default noticesSlice.reducer
