import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DateRangeState {
  activeDate?: Date
  weekRange: number
}

const initialState: DateRangeState = {
  activeDate: undefined,
  weekRange: 1
}

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setDateRange (state, action: PayloadAction<Date>) {
      state.activeDate = action.payload
    },
    setWeekRange (state, action: PayloadAction<number>) {
      state.weekRange = action.payload
    }
  }
})

export const {
  setDateRange,
  setWeekRange
} = dateRangeSlice.actions
export default dateRangeSlice.reducer