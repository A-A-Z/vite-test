import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import peopleReducer, { PeopleState } from './peopleSlice'
import noticeReducer, { NoticesState } from './noticesSlice'
import { divisionsSlice } from 'features/divisions'
import { breadcrumbsReducer, BreadcrumbsState } from 'features/breadcrumbs'
import { dateRangeReducer, DateRangeState } from 'features/dateRangePicker'

interface createStoreState {
  breadcrumbs?: BreadcrumbsState
  dateRange?: DateRangeState
  notices?: NoticesState
  people?: PeopleState
}

export const createStore = (state: createStoreState = {}) => {
  const store = configureStore({
    reducer: {
      breadcrumbs: breadcrumbsReducer,
      dateRange: dateRangeReducer,
      notices: noticeReducer,
      people: peopleReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
      [divisionsSlice.reducerPath]: divisionsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware).concat(divisionsSlice.middleware)
    },
    preloadedState: {
      ...state
    }
  })

  return store
}

export const store = createStore()
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof createStore>
