import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";


export const GetProduct = createAsyncThunk("counter/GetProduct", async () => {
    try {
      const { data } = await axiosRequest.get("/Product/get-products");
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
});