import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import peopleReducer, { PeopleState } from './peopleSlice'
import noticeReducer, { NoticesState } from './noticesSlice'

interface createStoreState {
  notices?: NoticesState
  people?: PeopleState
}

export const createStore = (state: createStoreState = {}) => {
  const store = configureStore({
    reducer: {
      people: peopleReducer,
      notices: noticeReducer,
      [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware)
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
