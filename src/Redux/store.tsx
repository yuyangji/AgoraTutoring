import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import programReducer from './slices/programSlice'
import assessmentReducer from './slices/assessmentsSlice'
import lessonsReducer from './slices/lessonSlice'
import submissionsReducer from './slices/submissionsSlice'
export const store = configureStore(
  {
  reducer: {
    user: userReducer,
    programs: programReducer,
    assessments: assessmentReducer,
      lessons: lessonsReducer,
    submissions: submissionsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {user:userState}
export type AppDispatch = typeof store.dispatch