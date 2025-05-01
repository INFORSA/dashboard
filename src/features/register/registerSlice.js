// features/auth/registerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const registerSlice = createSlice({
  name: 'regist',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { registerSuccess } = registerSlice.actions;
export default registerSlice.reducer;