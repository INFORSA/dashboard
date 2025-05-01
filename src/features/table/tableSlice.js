import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: [null], // default, bisa juga null awalnya
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export const { setColumns } = tableSlice.actions;
export default tableSlice.reducer;