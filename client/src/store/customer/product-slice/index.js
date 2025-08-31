import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    productList : [],
    productDetail : null
}


  export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProduct',

    async({filterParams, sortParams}) => {

       const query = new URLSearchParams({
                ...filterParams, 
                sortBy : sortParams
             })



        const response = await axios.get(`http://localhost:5000/api/customer/products/get?${query}`,  
  
        );


        console.log("API raw response:", response);

    // ✅ log only data (usually the useful part)
    console.log("API data:", response.data);

        return response?.data
    }
      
 )




   export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails',

    async(id) => {

        const response = await axios.get(`http://localhost:5000/api/customer/products/get/${id}`,  
  
        );


        return response?.data
    }
      
 )



const customerProductSlice = createSlice({
    name : 'customerProducts',
    initialState,
    reducers : {
        setProductDetails : (state)=> {
           state.productDetail = null
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state)=> {
                        state.isLoading = true
                    }).addCase(fetchAllFilteredProducts.fulfilled, (state,action)=> {
                        state.isLoading = false
                        state.productList = action.payload.data
                    }).addCase(fetchAllFilteredProducts.rejected, (state,action) => {
                        state.isLoading = false
                        state.productList = []
                    }).addCase(fetchProductDetails.pending, (state)=> {
                        state.isLoading = true
                    }).addCase(fetchProductDetails.fulfilled, (state,action)=> {
                        state.isLoading = false
                        state.productDetail = action.payload.data
                        
                    }).addCase(fetchProductDetails.rejected, (state,action) => {
                        state.isLoading = false
                        state.productDetail = null
                    })
    }
})

export const {setProductDetails} = customerProductSlice.actions;  
export default customerProductSlice.reducer;