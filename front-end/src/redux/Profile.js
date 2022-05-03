import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, put } from '../api/BaseRequest'


const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  }
}

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async() => {
    return await get('user/profile')
  }
)

export const putProfile = createAsyncThunk(
  'profile/putProfile',
  async(data) => {
    return await put('user/profile', data, config)
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

    // put profile
    [putProfile.pending]: (state, action) => {
      state.status = 'loading profile'
    },
    [putProfile.fulfilled]: (state, action) => {
      state.status = 'profile updated'
    },
    [putProfile.rejected]: (state, action) => {
      state.status = 'update fail'
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

