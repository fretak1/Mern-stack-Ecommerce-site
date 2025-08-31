import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




const initialState = {
  approvalURL : null,
  isLoading : false,
  orderId : null,
  orderList : [],
  orderDetails : null
}



export const createNewOrder = createAsyncThunk('/order/createNewOrder', async(orderData) => {
    const response = await axios.post('http://localhost:5000/api/customer/order/create',orderData)
    
    return response.data
})

export const capturePayment = createAsyncThunk('/order/capturePayment', async({paymentId,payerId,orderId}) => {
    const response = await axios.post('http://localhost:5000/api/customer/order/capture',{paymentId,payerId,orderId})
    
    return response.data
})

export const getAllOrdersByUser = createAsyncThunk('/order/getAllOrdersByUser', async(userId) => {
    const response = await axios.get(`http://localhost:5000/api/customer/order/list/${userId}`)
    
    return response.data
})

export const getOrderDetails = createAsyncThunk('/order/getOrderDetails', async(id) => {
    const response = await axios.get(`http://localhost:5000/api/customer/order/details/${id}`)
    
    return response.data
})

const customerOrderSlice = createSlice({
    name : "customerOrderSlice",
    initialState,
    reducers : {
        resetOrderDetails:(state) => {
            state.orderDetails = null
        }
    },
    extraReducers : (builder) => {
          builder.addCase(createNewOrder.pending, (state)=> {
                                state.isLoading = true
                            }).addCase(createNewOrder.fulfilled, (state,action)=> {
                                state.isLoading = false
                                state.approvalURL = action.payload.approvalURL
                                state.orderId = action.payload.orderId
                                sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
                            }).addCase(createNewOrder.rejected, (state,action) => {
                                state.isLoading = false
                                state.approvalURL = null
                                state.orderId = null
                            }).addCase(getAllOrdersByUser.pending, (state)=> {
                                state.isLoading = true
                            }).addCase(getAllOrdersByUser.fulfilled, (state,action)=> {
                                state.isLoading = false
                                state.orderList = action.payload.data
                            }).addCase(getAllOrdersByUser.rejected, (state,action) => {
                                state.isLoading = false
                                state.orderList = []
                            }).addCase(getOrderDetails.pending, (state)=> {
                                state.isLoading = true
                            }).addCase(getOrderDetails.fulfilled, (state,action)=> {
                                state.isLoading = false
                                state.orderDetails = action.payload.data
                                console.log(state.orderDetails,"in Slice")
                            }).addCase(getOrderDetails.rejected, (state,action) => {
                                state.isLoading = false
                                state.orderDetails = null
                            })
    }
})



export const {resetOrderDetails} = customerOrderSlice.actions

export default customerOrderSlice.reducer;