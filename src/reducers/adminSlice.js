import { createSlice } from '@reduxjs/toolkit';
import { DeleteProductById, GetByCategory, GetProduct, getOrder, login } from '../api/api';
import toast from 'react-hot-toast';

const initialState = {
  data: [],
  order: [],
  categore: [],
  token: null
};

export const AdminSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload; 
      localStorage.setItem('token', action.payload);
      toast.success('Successfully logged in!');
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(GetProduct.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    })
    builder.addCase(GetByCategory.fulfilled, (state, action) => {
      state.categore = action.payload;
    })
  },
});

export default AdminSlice.reducer;
