
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, put, post, del, patch } from '../api/BaseRequest'

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  }
}

export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async(params) => {
    return await get('users/search', params)
  }
)

export const getAdmins = createAsyncThunk(
  'admins/getAdmins',
  async() => {
    return await get('admins')
  }
)

export const getTrashUsers = createAsyncThunk(
  'users/getTrashUsers',
  async(params) => {
    return await get('users/trash', params)
  }
)

export const postUsers = createAsyncThunk(
  'user/postUser',
  async(data) => {
    return await post('users', data, config)
  }
)

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async(id) => {
    return await get(`users/${id}`)
  }
)

export const putUserById = createAsyncThunk(
  'user/putUser',
  async(data) => {
    const { id, formData } = data
    return await put(`users/${id}`, formData, config)
  }
)

export const restoreUser = createAsyncThunk(
  'user/restoreUser',
  async(id) => {
    return await patch(`users/${id}/restore`)
  }
)

export const forceDeleteUser = createAsyncThunk(
  'user/forceDeleteUser',
  async(id) => {
    return await del(`users/${id}/force`)
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    admins:{},
    status: null
  },
  extraReducers: {
    // search users
    [searchUsers.pending]: (state, action) => {
      state.status = 'loading'
    },
    [searchUsers.fulfilled]: (state, action) => {
      state.users = action.payload
      state.status = 'success'
    },
    [searchUsers.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get admin
    [getAdmins.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getAdmins.fulfilled]: (state, action) => {
      state.admins = action.payload
      state.status = 'success'
    },
    [getAdmins.rejected]: (state, action) => {
      state.status = 'failed'
    },

     // get users by id
    [getUserById.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getUserById.fulfilled]: (state, action) => {
      state.users = action.payload
      state.status = 'success'
    },
    [getUserById.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get trash users
    [getTrashUsers.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getTrashUsers.fulfilled]: (state, action) => {
      state.users = action.payload
      state.status = 'success'
      state.message = 'success'
    },
    [getTrashUsers.rejected]: (state, action) => {
      state.status = 'failed'
    },


    // post user
    [postUsers.pending]: (state, action) => {
      state.status = 'loading'
    },
    [postUsers.fulfilled]: (state, action) => {
      state.users = action.payload
      state.status = 'user created'
    },
    [postUsers.rejected]: (state, action) => {
      state.status = 'create failed'
    },

    // put user by ID
    [putUserById.pending]: (state, action) => {
      state.status = 'loading'
    },
    [putUserById.fulfilled]: (state, action) => {
      state.users = action.payload
      state.status = 'user updated'
    },
    [putUserById.rejected]: (state, action) => {
      state.status = 'update failed'
    },

    // restore user
    [restoreUser.pending]: (state, action) => {
      state.status = 'loading'
    },
    [restoreUser.fulfilled]: (state, action) => {
      state.users = action.payload
      state.status = 'user restored'
    },
    [restoreUser.rejected]: (state, action) => {
      state.status = 'restore fail'
    },

    // delete force user by id
    [forceDeleteUser.pending]: (state, action) => {
      state.status = 'loading'
    },
    [forceDeleteUser.fulfilled]: (state, action) => {
      state.user = action.payload
      state.status = 'user deleted force'
    },
    [forceDeleteUser.rejected]: (state, action) => {
      state.status = 'delete force fail'
    },
  }
})
export default usersSlice.reducer

