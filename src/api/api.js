import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";


export const GetProduct = createAsyncThunk("counter/GetProduct", async () => {
    try {
      const { data } = await axiosRequest.get("/Product/get-products");
      return data;
    } catch (error) {
      console.error(error);
    }
});

export const getOrder = createAsyncThunk("counter/getOrder", async () => {
    try {
      const { data } = await axiosRequest.get("/Cart/get-products-from-cart");
      return data;
    } catch (error) {
      console.error(error);
    }
});

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axiosRequest.post("/Account/Login", credentials);
    if (data.statusCode === 200) {
      return data.data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    toast.error("Error logging in");
    return rejectWithValue(error.response.data);
  }
});