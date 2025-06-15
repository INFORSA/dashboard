import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { loginAPI } from '../services/login'
import { registerAPI } from '../services/regist'
import { deptAPI } from '../services/dept'
import { roleAPI, userAPI } from '../services/user'
import { excelAPI } from '../services/excel'
import { matriksAPI, penilaianAPI } from '../services/penilaian'

export default configureStore({
  reducer: {
    auth: authReducer,
    [loginAPI.reducerPath]: loginAPI.reducer, 

    [deptAPI.reducerPath]: deptAPI.reducer, 

    [userAPI.reducerPath]: userAPI.reducer, 
    [registerAPI.reducerPath]: registerAPI.reducer, 

    [roleAPI.reducerPath]: roleAPI.reducer, 
    [excelAPI.reducerPath]: excelAPI.reducer, 
    
    [penilaianAPI.reducerPath]: penilaianAPI.reducer, 
    [matriksAPI.reducerPath]: matriksAPI.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( roleAPI.middleware, registerAPI.middleware, loginAPI.middleware, deptAPI.middleware, 
                                    userAPI.middleware, excelAPI.middleware, penilaianAPI.middleware, matriksAPI.middleware ), 
})
