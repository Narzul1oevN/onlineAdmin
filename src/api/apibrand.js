
//  get Brand

import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosRequest } from "../utils/axiosRequest"
import { GetBrand } from "./api"

export const GetBrands = createAsyncThunk('counterSlice/GetBrands',async()=>{
    try {
        const {data} = await axiosRequest.get('/Brand/get-brands')
        return data.data
    } catch (error) {
        console.error(error)
    }
  })




//    post brand 

export const PostBrand = createAsyncThunk('TodoSlicer/PostBrand',async(brand, {dispatch})=>{

    try {
        const {data} = await axiosRequest.post(`/Brand/add-brand?BrandName=${brand.brandName}`)
        dispatch(GetBrand())
        return data.data
    } catch (error) {
        console.error(error);
        
    }
})


//  delete 

export const deleteBrand = createAsyncThunk('TodoSlicer/deleteBrand',async(id, {dispatch})=>{
    try {
        const {data} = await axiosRequest.delete(`/Brand/delete-brand?id=${id}`)
        dispatch(GetBrand())
        console.log(data.data);
        
        return data.data
    } catch (error) {
        console.error(error);
        
    }
})


//  edit 

export const editBrandPr = createAsyncThunk('TodoSlicer/editBrandPr', async(Brand,{dispatch})=>{
    console.log(Brand);
    try {
        const {data} = await axiosRequest.put(`/Brand/update-brand?Id=${Brand.id}&BrandName=${Brand.brandName}`)
        dispatch(GetBrand())
        return data.data
    } catch (error) {
        console.error(error);
        
    }
})
