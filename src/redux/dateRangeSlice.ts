import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTodayAsString } from '../utils/dates'

export interface DateRangeState {
  activeDate: string
  weekRange: number
}

const initialState: DateRangeState = {
  activeDate: getTodayAsString(),
  weekRange: 1
}

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setActiveDate (state, action: PayloadAction<string>) {
      state.activeDate = action.payload
    },
    setWeekRange (state, action: PayloadAction<number>) {
      state.weekRange = action.payload
    },
    navRangeForward (state) {
      if (state.activeDate === undefined) {
        return
      }
      const dateObj = new Date(state.activeDate)
      dateObj.setDate(dateObj.getDate() + (7 * state.weekRange))
      state.activeDate = dateObj.toString()
    },
    navRangeBack (state) {
      if (state.activeDate === undefined) {
        return
      }
      const dateObj = new Date(state.activeDate)
      dateObj.setDate(dateObj.getDate() - (7 * state.weekRange))
      state.activeDate = dateObj.toString()
    }
  }
})

export const {
  setActiveDate,
  setWeekRange,
  navRangeForward,
  navRangeBack
} = dateRangeSlice.actions
export default dateRangeSlice.reducer
