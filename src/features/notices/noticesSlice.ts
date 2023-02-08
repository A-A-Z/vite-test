import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Notice } from './types'

export interface NoticesState {
  notices: Notice[]
}

const initialState: NoticesState = {
  notices: []
}

export const addNotice = createAsyncThunk(
  'notices/addNotice',
  async (notice: Notice) => {
    await noticeTimeout()
    return notice
  }
)

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    removeNotice (state, action: PayloadAction<string>) {
      state.notices = state.notices.filter(({ id }) => id !== action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(addNotice.pending, (state, action) => {
      const newNotice = { ...action.meta.arg, id: action.meta.requestId }
      state.notices.push(newNotice)
    })
    builder.addCase(addNotice.fulfilled, (state, action) => {
      state.notices = state.notices.filter(notice => notice.id !== action.meta.requestId)
    })
  }
})

const noticeTimeout = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 15_1000))

export const { removeNotice } = noticesSlice.actions
export default noticesSlice.reducer
