import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { loginAPI } from '../services/login'
import { registerAdminAPI, registerStaffAPI } from '../services/regist'
import { deptAPI } from '../services/dept'
import { anggotaAPI, userAPI } from '../services/user'

export default configureStore({
  reducer: {
    authReducer: authReducer,
    [loginAPI.reducerPath]: loginAPI.reducer, 

    [registerStaffAPI.reducerPath]: registerStaffAPI.reducer, 
    [registerAdminAPI.reducerPath]: registerAdminAPI.reducer, 
    
    [deptAPI.reducerPath]: deptAPI.reducer, 
    [userAPI.reducerPath]: userAPI.reducer, 
    [anggotaAPI.reducerPath]: anggotaAPI.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(registerAdminAPI.middleware, registerStaffAPI.middleware, loginAPI.middleware, deptAPI.middleware, userAPI.middleware, anggotaAPI.middleware), // <--- ini juga penting buat async query
})
