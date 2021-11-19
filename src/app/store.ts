import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import bookReducer from 'slices/bookSlice'
import authReducer from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
