
import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    featureImageList : []
}

export const getFeatureImages = createAsyncThunk('/order/getFeatureImages', async() => {
    const response = await axios.get(`http://localhost:5000/api/common/feature/get`)
    
    return response.data
})

export const addFeatureImage = createAsyncThunk('/order/addFeatureImage', async(image) => {
    const response = await axios.post(`http://localhost:5000/api/common/feature/add`,{image})
    
    return response.data
})


const featureSlice = createSlice({
    name : 'featureSlice',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getFeatureImages.pending, (state)=> {
                                        state.isLoading = true
                                    }).addCase(getFeatureImages.fulfilled, (state,action)=> {
                                        state.isLoading = false
                                        state.featureImageList = action.payload.data
                                    }).addCase(getFeatureImages.rejected, (state,action) => {
                                        state.isLoading = false
                                        state.featureImageList = []
                                        
                                    })
    }
})


export default featureSlice.reducer;
