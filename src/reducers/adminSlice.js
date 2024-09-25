import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: []
};

export const AdminSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default AdminSlice.reducer;
