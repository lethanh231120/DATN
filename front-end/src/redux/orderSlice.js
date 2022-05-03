import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../api/BaseRequest'

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async(params) => {
    return await get('orders', params)
  }
)

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async(id) => {
    return await get(`orders/${id}`)
  }
)

export const searchOrder = createAsyncThunk(
  'order/searchOrder',
  async(params) => {
    return await get('orders/search', params)
  }
)

export const getMyOrders = createAsyncThunk(
  'orders/getMyOrders',
  async() => {
    return await get('orders/myorders')
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: {},
    status: null,
    myOrder: []
  },
  extraReducers: {
    // get orders
    [getOrders.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload
      state.status = 'success'
    },
    [getOrders.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // search orders
    [searchOrder.pending]: (state, action) => {
      state.status = 'loading'
    },
    [searchOrder.fulfilled]: (state, action) => {
      state.orders = action.payload
      state.status = 'success'
    },
    [searchOrder.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get order by id
    [getOrderById.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getOrderById.fulfilled]: (state, action) => {
      state.orders = action.payload
      state.status = 'success'
    },
    [getOrderById.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get my orders
    [getMyOrders.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getMyOrders.fulfilled]: (state, action) => {
      state.myOrder = action.payload
      state.status = 'success'
    },
    [getMyOrders.rejected]: (state, action) => {
      state.status = 'failed'
    }
  }
})
export default ordersSlice.reducer
