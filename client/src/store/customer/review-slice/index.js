
import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading : false,
    reviews : []
}

export const addReview = createAsyncThunk('/order/addReview', async(data) => {
const response = await axios.post(`http://localhost:5000/api/customer/review/add`,data)
    
    return response.data
})

export const getReviews = createAsyncThunk('/order/getReviews', async(id) => {
    const response = await axios.get(`http://localhost:5000/api/customer/review/${id}`)
    
    return response.data
})


const reviewSlice = createSlice({
    name : 'reviewSlice',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
           builder.addCase(getReviews.pending, (state)=> {
                                                 state.isLoading = true
                                             }).addCase(getReviews.fulfilled, (state,action)=> {
                                                 state.isLoading = false
                                                 state.reviews = action.payload.data
                                             }).addCase(getReviews.rejected, (state,action) => {
                                                 state.isLoading = false
                                                 state.reviews = []
                                                 
                                             })
    }
})


export default reviewSlice.reducer;
