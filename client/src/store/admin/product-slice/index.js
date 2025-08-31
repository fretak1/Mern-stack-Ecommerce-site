import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isLoading : false,
    productList : []
}

 export const addNewProduct = createAsyncThunk('/products/addNewProduct',

    async(FormData) => {
        const response = await axios.post('http://localhost:5000/api/admin/products/add',
            FormData,{
                "Content-type": "application/json",
            }
        );
        return response?.data
    }
      
 )

  export const fetchAllProduct = createAsyncThunk('/products/fetchAllProduct',

    async() => {
        const response = await axios.get('http://localhost:5000/api/admin/products/get',
            
        );
        return response?.data
    }
      
 )

  export const editProduct = createAsyncThunk('/products/editProduct',

    async({id, ...formData}) => {
        const response = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`,
            formData,{
                "Content-type": "application/json",
            }
        );
        return response?.data
    }
      
 )

  export const deleteProduct = createAsyncThunk('/products/deleteProduct',

    async(id) => {
        const response = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`,
            
        );
        return response?.data
    }
      
 )

const adminProductSlice = createSlice({
    name : "adminProducts",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
         builder.addCase(fetchAllProduct.pending, (state)=> {
                        state.isLoading = true
                    }).addCase(fetchAllProduct.fulfilled, (state,action)=> {
                        state.isLoading = false
                        state.productList = action.payload.data
                    }).addCase(fetchAllProduct.rejected, (state,action) => {
                        state.isLoading = false
                        state.isAuthenticated = []
                    })
    }
})

export default adminProductSlice.reducer