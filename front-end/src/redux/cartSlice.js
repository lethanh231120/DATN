import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, del } from '../api/BaseRequest'

export const getAllCarts = createAsyncThunk(
  'carts/getAllCarts',
  async() => {
    return await get('carts')
  }
)

export const postCart = createAsyncThunk(
  'cart/postCart',
  async(data) => {
    return await post('carts', data)
  }
)

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async(id) => {
    return await del(`carts/${id}`)
  }
)

const cartsSlice = createSlice({
  name: 'carts',
  initialState: {
    carts: {},
    status: null
  },
  extraReducers: {
    // get all cart by user
    [getAllCarts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getAllCarts.fulfilled]: (state, action) => {
      state.carts = action.payload
      state.status = 'success'
    },
    [getAllCarts.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // post cart
    [postCart.pending]: (state, action) => {
      state.status = 'loading'
    },
    [postCart.fulfilled]: (state, action) => {
      state.carts = action.payload
      state.status = 'add cart successfully'
    },
    [postCart.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // delete cart
    [deleteCart.pending]: (state, action) => {
      state.status = 'loading'
    },
    [deleteCart.fulfilled]: (state, action) => {
      state.carts = action.payload
      state.status = 'cart deleted'
    },
    [deleteCart.rejected]: (state, action) => {
      state.status = 'delete fail'
    },
  }
})
export default cartsSlice.reducer
