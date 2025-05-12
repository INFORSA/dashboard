import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import registerReducer from '../features/register/registerSlice'
import { loginAPI } from '../services/login'
import { registerAPI } from '../services/regist'
import { deptAPI } from '../services/dept'
import { userAPI } from '../services/user'

export default configureStore({
  reducer: {
    authReducer: authReducer,
    [loginAPI.reducerPath]: loginAPI.reducer, 

    registerReducer: registerReducer,
    [registerAPI.reducerPath]: registerAPI.reducer, 
    
    [deptAPI.reducerPath]: deptAPI.reducer, 
    [userAPI.reducerPath]: userAPI.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(registerAPI.middleware, loginAPI.middleware, deptAPI.middleware, userAPI.middleware), // <--- ini juga penting buat async query
})
