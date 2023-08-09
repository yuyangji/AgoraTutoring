import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import programReducer from './programSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    programs: programReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {user:userState}
export type AppDispatch = typeof store.dispatch