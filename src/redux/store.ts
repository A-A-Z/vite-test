import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import peopleReducer from './peopleSlice'
import noticeReducer, { NoticesState } from './noticesSlice'

interface createStoreState {
  notices?: NoticesState
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

// export const store = configureStore({
//   reducer: {
//     people: peopleReducer,
//     notices: noticeReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer
//   },
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(apiSlice.middleware)
//   }
// })

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
