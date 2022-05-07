import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, put } from '../api/BaseRequest'

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async() => {
    return await get('user/profile')
  }
)

export const changPassword = createAsyncThunk(
  'password/changPassword',
  async(data) => {
    return await put('user/change-password', data)
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
    status: null
  },
  extraReducers: {
    // get profile
    [getProfile.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getProfile.fulfilled]: (state, action) => {
      state.profile = action.payload
      state.status = 'success'
    },
    [getProfile.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // change password
    [changPassword.pending]: (state, action) => {
      state.status = 'loading'
    },
    [changPassword.fulfilled]: (state, action) => {
      state.status = 'change password successfully'
    },
    [changPassword.rejected]: (state, action) => {
      state.status = 'change password fail'
    }
  }
})
export default profileSlice.reducer

