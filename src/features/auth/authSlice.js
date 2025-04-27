import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  userToken: null,
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId
      state.userToken = action.payload.userToken
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.userId = null
      state.userToken = null
      state.isAuthenticated = false
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions

export default authSlice.reducer
