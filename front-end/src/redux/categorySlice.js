import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, put, del, patch } from '../api/BaseRequest'

export const getAllCategories = createAsyncThunk(
  'categories/getAllCategories',
  async() => {
    return await get('categories/all-categories')
  }
)

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async(params) => {
    return await get('categories', params)
  }
)

export const searchCategory = createAsyncThunk(
  'category/searchCategory',
  async(params) => {
    return await get('categories/search', params)
  }
)

export const getTrashCategories = createAsyncThunk(
  'categories/getTrashCategories',
  async(params) => {
    return await get('categories/trash', params)
  }
)

export const getCategoryById = createAsyncThunk(
  'category/getCategoryById',
  async(id) => {
    return await get(`categories/${id}`)
  }
)

export const postCategory = createAsyncThunk(
  'category/postCategory',
  async(data) => {
    return await post('categories', data)
  }
)

export const putCategory = createAsyncThunk(
  'category/putCategory',
  async(data) => {
    const { id, info } = data
    return await put(`categories/${id}`, info)
  }
)

export const restoreCategory = createAsyncThunk(
  'category/restoreCategory',
  async(id) => {
    return await patch(`categories/${id}/restore`)
  }
)

export const forceDeleteCategory = createAsyncThunk(
  'category/forceDeleteCategory',
  async(id) => {
    return await del(`categories/${id}/force`)
  }
)


const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: {},
    status: null
  },
  extraReducers: {
    // get all categories
    [getAllCategories.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.categories = action.payload
      state.status = 'success'
    },
    [getAllCategories.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get categories
    [getCategories.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload
      state.status = 'success'
    },
    [getCategories.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // search category
    [searchCategory.pending]: (state, action) => {
      state.status = 'loading'
    },
    [searchCategory.fulfilled]: (state, action) => {
      state.categories = action.payload
      state.status = 'success'
    },
    [searchCategory.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get trash categories
    [getTrashCategories.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getTrashCategories.fulfilled]: (state, action) => {
      state.categories = action.payload
      state.status = 'success'
    },
    [getTrashCategories.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get category By Id
    [getCategoryById.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getCategoryById.fulfilled]: (state, action) => {
      state.categories = action.payload
      state.status = 'success'
    },
    [getCategoryById.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // post categories
    [postCategory.pending]: (state, action) => {
      state.status = 'loading'
    },
    [postCategory.fulfilled]: (state, action) => {
      state.categories = action.payload
      state.status = 'category created'
    },
    [postCategory.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // put categories
    [putCategory.pending]: (state, action) => {
      state.status = 'loading'
    },
    [putCategory.fulfilled]: (state, action) => {
      state.categories = action.payload
      state.status = 'category updated'
    },
    [putCategory.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // restore  category
    [restoreCategory.pending]: (state, action) => {
      state.status = 'loading'
    },
    [restoreCategory.fulfilled]: (state, action) => {
      state.categories = action.payload
      state.status = 'category restored'
    },
    [restoreCategory.rejected]: (state, action) => {
      state.status = 'restore fail'
    },

    // delete force category
    [forceDeleteCategory.pending]: (state, action) => {
      state.status = 'loading'
    },
    [forceDeleteCategory.fulfilled]: (state, action) => {
      state.categories = action.payload
      state.status = 'category deleted force'
    },
    [forceDeleteCategory.rejected]: (state, action) => {
      state.status = 'delete force fail'
    }
  }
})
export default categoriesSlice.reducer
