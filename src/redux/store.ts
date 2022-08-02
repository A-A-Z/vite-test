import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counter-slice'
// import { apiSlice } from '../features/dogs/dogs-api-slice'
import peopleReducer from './peopleSlice'


export const store = configureStore({
  reducer: {
    people: peopleReducer
    // counter: counterReducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(apiSlice.middleware)
//   },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
