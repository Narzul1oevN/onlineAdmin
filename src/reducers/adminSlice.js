import { createSlice } from '@reduxjs/toolkit';
import { GetProduct } from '../api/api';

const initialState = {
  data: []
};

export const AdminSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetProduct.fulfilled, (state, action) => {
      state.data = action.payload;
    })
  },
});

export default AdminSlice.reducer;
