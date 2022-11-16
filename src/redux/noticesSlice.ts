import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

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

export const addNotice = createAsyncThunk(
  'notices/fetchByIdStatus',
  async (notice: notice) => {
    await noticeTimeout()
    return notice.id
  }
)

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    // addNotice (state, action: PayloadAction<notice>) {
    //   state.notices = [...state.notices, action.payload]
    // },
    removeNotice (state, action: PayloadAction<string>) {
      state.notices = state.notices.filter(({ id }) => id === action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(addNotice.pending, (state, action) => {
      console.log('pending', action.meta.arg)
    })
    builder.addCase(addNotice.fulfilled, (state, action) => {
      console.log('fulfilled', action)
    })
  }
})

const noticeTimeout = () => new Promise(resolve => setTimeout(resolve, 2000))

export const {
  // addNotice,
  removeNotice
} = noticesSlice.actions
export default noticesSlice.reducer
