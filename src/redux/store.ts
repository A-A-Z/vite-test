import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import { divisionsSlice } from '../features/divisions/divisionsSlice'
import peopleReducer, { PeopleState } from './peopleSlice'
import noticeReducer, { NoticesState } from './noticesSlice'
import breadcrumbsReducer, { BreadcrumbsState } from './breadcrumbsSlice'
import dateRangeReducer, { DateRangeState } from './dateRangeSlice'

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
