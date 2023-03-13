import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react'
import { useState } from 'react'
const baseURL = "https://dummyjson.com/products"
export const fetchContent = createAsyncThunk("root/fetchContent", async ({ }, { dispatch }) => {

    const res = await axios(baseURL)
    const data =  res.data.products
    dispatch(setData(data))

    return data;
})

export const deleteData = createAsyncThunk("root/delete", async ({ id, contents }, { dispatch }) => {
    console.log(id);
    axios.delete(`${baseURL}/` + id).then(res => {

        dispatch(setData(contents.filter(item => item.id !== id)))
        console.log("deleted", res)
    })
})

export const addData = createAsyncThunk("root/add", async (data) => {
    console.log("dsata",data)
    const res = await axios.post(`${baseURL}/add`,data)
    console.log(res.data)
    return res

})

export const updateData = createAsyncThunk("root/update", async ({id,data}) => {
    const res = await axios.put(`${baseURL}/${id}`, data)
    return res
    
})

export const rootSlice = createSlice({
    name: 'content',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },

    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContent.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchContent.fulfilled, (state, action) => {
            state.contents = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchContent.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false;
        })
    }
})

// Action creators are generated for each case reducer function
export const { setData } = rootSlice.actions

export default rootSlice.reducer