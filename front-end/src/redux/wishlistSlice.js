import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, del } from '../api/BaseRequest'

export const getAllWishlist = createAsyncThunk(
  'wishlists/getAllWishlist',
  async() => {
    return await get('wishlists')
  }
)

export const postWishList = createAsyncThunk(
  'wishlist/postWishList',
  async(data) => {
    return await post('wishlists', data)
  }
)

export const deleteWishList = createAsyncThunk(
  'wishlist/deleteWishList',
  async(id) => {
    return await del(`wishlists/${id}`)
  }
)

const wishlistsSlice = createSlice({
  name: 'carts',
  initialState: {
    wishlists: {},
    message: null
  },
  extraReducers: {
    // get all wishlist by user
    [getAllWishlist.pending]: (state, action) => {
      state.message = 'loading'
    },
    [getAllWishlist.fulfilled]: (state, action) => {
      state.wishlists = action.payload
      state.message = 'success'
    },
    [getAllWishlist.rejected]: (state, action) => {
      state.message = 'failed'
    },

    // post wishlist
    [postWishList.pending]: (state, action) => {
      state.message = 'loading'
    },
    [postWishList.fulfilled]: (state, action) => {
      state.wishlists = action.payload
      state.message = 'add wishlist successfully'
    },
    [postWishList.rejected]: (state, action) => {
      state.message = 'failed'
    },

    // delete wishlist
    [deleteWishList.pending]: (state, action) => {
      state.message = 'loading'
    },
    [deleteWishList.fulfilled]: (state, action) => {
      state.wishlists = action.payload
      state.message = 'wishlist deleted'
    },
    [deleteWishList.rejected]: (state, action) => {
      state.message = 'delete fail'
    },
  }
})
export default wishlistsSlice.reducer
