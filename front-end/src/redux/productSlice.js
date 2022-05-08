import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, put, del, patch } from '../api/BaseRequest'

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  }
}

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async(params) => {
    return await get('products', params)
  }
)

export const searchProduct = createAsyncThunk(
  'product/searchProduct',
  async(params) => {
    return await get('products/search', params)
  }
)

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async() => {
    return await get('products/all-products')
  }
)

export const getAllProductReviews = createAsyncThunk(
  'products/getAllProductReviews',
  async(id) => {
    return await get(`products/${id}/reviews`)
  }
)

export const getTopRatingProducts = createAsyncThunk(
  'products/getTopRatingProducts',
  async(params) => {
    return await get('products/top-rating', params)
  }
)

export const getLatestProducts = createAsyncThunk(
  'products/getLatestProducts',
  async(params) => {
    return await get('products/latest', params)
  }
)

export const getTrashProducts = createAsyncThunk(
  'products/getTrashProducts',
  async(params) => {
    return await get('products/trash', params)
  }
)

export const postProduct = createAsyncThunk(
  'product/postProduct',
  async(data) => {
    return await post('products', data, config)
  }
)

export const postProductReview = createAsyncThunk(
  'product/postProductReview',
  async(data) => {
    const { id, info } = data
    return await post(`products/${id}/review`, info)
  }
)

export const putProductById = createAsyncThunk(
  'product/putProductById',
  async(data) => {
    const { id, formData } = data
    return await put(`products/${id}`, formData, config)
  }
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async(id) => {
    return await del(`products/${id}`)
  }
)

export const restoreProduct = createAsyncThunk(
  'Product/restoreProduct',
  async(id) => {
    return await patch(`products/${id}/restore`)
  }
)

export const forceDeleteProduct = createAsyncThunk(
  'product/forceDeleteProduct',
  async(id) => {
    return await del(`products/${id}/force`)
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: {},
    productsRating: {},
    productsLatest: {},
    reviews: [],
    status: null,
    message: null
  },
  extraReducers: {
    // get products by params
    [getProducts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload
      state.status = 'success'
      state.message = 'success'
    },
    [getProducts.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get all products
    [getAllProducts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.products = action.payload
      state.status = 'success'
      state.message = 'success'
    },
    [getAllProducts.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get all product reviews
    [getAllProductReviews.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getAllProductReviews.fulfilled]: (state, action) => {
      state.reviews = action.payload
      state.status = 'success'
      state.message = 'success'
    },
    [getAllProductReviews.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // search product
    [searchProduct.pending]: (state, action) => {
      state.status = 'loading'
    },
    [searchProduct.fulfilled]: (state, action) => {
      state.products = action.payload
      state.status = 'success'
      state.message = 'success'
    },
    [searchProduct.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get top rating products
    [getTopRatingProducts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getTopRatingProducts.fulfilled]: (state, action) => {
      state.productsRating = action.payload
      state.status = 'success'
      state.message = 'success'
    },
    [getTopRatingProducts.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get latest products
    [getLatestProducts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getLatestProducts.fulfilled]: (state, action) => {
      state.productsLatest = action.payload
      state.status = 'success'
      state.message = 'success'
    },
    [getLatestProducts.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // get trash products
    [getTrashProducts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getTrashProducts.fulfilled]: (state, action) => {
      state.products = action.payload
      state.status = 'success'
      state.message = 'success'
    },
    [getTrashProducts.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // post products
    [postProduct.pending]: (state, action) => {
      state.status = 'loading'
    },
    [postProduct.fulfilled]: (state, action) => {
      state.products = action.payload
      state.status = 'product created'
    },
    [postProduct.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // post product review
    [postProductReview.pending]: (state, action) => {
      state.status = 'loading'
    },
    [postProductReview.fulfilled]: (state, action) => {
      state.reviews = action.payload
      state.status = 'create review successfully'
    },
    [postProductReview.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // put product by id
    [putProductById.pending]: (state, action) => {
      state.status = 'loading'
    },
    [putProductById.fulfilled]: (state, action) => {
      state.products = action.payload
      state.status = 'product updated'
    },
    [putProductById.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // delete products
    [deleteProduct.pending]: (state, action) => {
      state.status = 'loading'
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.products = action.payload
      state.status = 'product deleted'
    },
    [deleteProduct.rejected]: (state, action) => {
      state.status = 'deleted fail'
    },

    // restore  product
    [restoreProduct.pending]: (state, action) => {
      state.status = 'loading'
    },
    [restoreProduct.fulfilled]: (state, action) => {
      state.products = action.payload
      state.status = 'product restored'
    },
    [restoreProduct.rejected]: (state, action) => {
      state.status = 'restore fail'
    },

    // delete force product
    [forceDeleteProduct.pending]: (state, action) => {
      state.status = 'loading'
    },
    [forceDeleteProduct.fulfilled]: (state, action) => {
      state.products = action.payload
      state.status = 'product deleted force'
    },
    [forceDeleteProduct.rejected]: (state, action) => {
      state.status = 'delete force fail'
    }
  }
})
export default productSlice.reducer
