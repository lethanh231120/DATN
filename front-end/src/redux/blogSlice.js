import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, put, patch, del } from '../api/BaseRequest'

export const getBlogs = createAsyncThunk(
  'blogs/getBlogs',
  async(params) => {
    return await get('blogs', params)
  }
)

export const getTrashBlogs = createAsyncThunk(
  'blogs/getTrashBlogs',
  async(params) => {
    return await get('blogs/trash', params)
  }
)

export const postBlog = createAsyncThunk(
  'blog/postBlog',
  async(data) => {
    return await post('blogs', data)
  }
)

export const getBlogById = createAsyncThunk(
  'blog/getBlogById',
  async(id) => {
    return await get(`blogs/${id}`)
  }
)

export const getBlogByUserId = createAsyncThunk(
  'blog/getBlogByUserId',
  async(data) => {
    const { userId, params } = data
    return await get(`blogs/userId/${userId}`, params)
  }
)

export const putBlogById = createAsyncThunk(
  'blog/putBlogById',
  async(info) => {
    const { id, data } = info
    return await put(`blogs/${id}`, data)
  }
)

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async(id) => {
    return await del(`blogs/${id}`)
  }
)

export const restoreBlog = createAsyncThunk(
  'blog/restoreBlog',
  async(id) => {
    return await patch(`blogs/${id}/restore`)
  }
)

export const forceDeleteBlog = createAsyncThunk(
  'blog/forceDeleteBlog',
  async(id) => {
    return await del(`blogs/${id}/force`)
  }
)

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: {},
    status: null
  },
  extraReducers: {
    // get blogs
    [getBlogs.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getBlogs.fulfilled]: (state, action) => {
      state.blogs = action.payload
      state.status = 'success'
    },
    [getBlogs.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get trash blogs
    [getTrashBlogs.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getTrashBlogs.fulfilled]: (state, action) => {
      state.blogs = action.payload
      state.status = 'success'
      state.message = 'success'
    },
    [getTrashBlogs.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // post blogs
    [postBlog.pending]: (state, action) => {
      state.status = 'loading'
    },
    [postBlog.fulfilled]: (state, action) => {
      state.blogs = action.payload
      state.status = 'blog created'
    },
    [postBlog.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get Blog By Id
    [getBlogById.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getBlogById.fulfilled]: (state, action) => {
      state.blogs = action.payload
      state.status = 'get blog success'
    },
    [getBlogById.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get Blog By UserId
    [getBlogByUserId.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getBlogByUserId.fulfilled]: (state, action) => {
      state.blogs = action.payload
      state.status = 'get blog success'
    },
    [getBlogByUserId.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // put product by id
    [putBlogById.pending]: (state, action) => {
      state.status = 'loading'
    },
    [putBlogById.fulfilled]: (state, action) => {
      state.blogs = action.payload
      state.status = 'blog updated'
    },
    [putBlogById.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // delete blogs
    [deleteBlog.pending]: (state, action) => {
      state.status = 'loading'
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.blogs = action.payload
      state.status = 'blog deleted'
    },
    [deleteBlog.rejected]: (state, action) => {
      state.status = 'deleted fail'
    },

    // restore  blog
    [restoreBlog.pending]: (state, action) => {
      state.status = 'loading'
    },
    [restoreBlog.fulfilled]: (state, action) => {
      state.blogs = action.payload
      state.status = 'blog restored'
    },
    [restoreBlog.rejected]: (state, action) => {
      state.status = 'restore fail'
    },

    // delete force blog
    [forceDeleteBlog.pending]: (state, action) => {
      state.status = 'loading'
    },
    [forceDeleteBlog.fulfilled]: (state, action) => {
      state.blogs = action.payload
      state.status = 'blog deleted force'
    },
    [forceDeleteBlog.rejected]: (state, action) => {
      state.status = 'delete force fail'
    },

  }
})
export default blogsSlice.reducer
