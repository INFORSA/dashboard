import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { loginAPI } from '../services/login'

export default configureStore({
  reducer: {
    authReducer: authReducer,
    [loginAPI.reducerPath]: loginAPI.reducer, // <--- ini penting buat API slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginAPI.middleware), // <--- ini juga penting buat async query
})
