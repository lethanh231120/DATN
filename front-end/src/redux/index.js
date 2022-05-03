import { combineReducers } from '@reduxjs/toolkit'

import userInfo from './userInfo'
import categorySlice from './categorySlice'
import productSlice from './productSlice'
import orderSlice from './orderSlice'
import profileSlice from './Profile'
import userSlice from './userSlice'
import blogSlice from './blogSlice'
import cartSlice from './cartSlice'
import wishlistSlice from './wishlistSlice'

export default combineReducers({
  userInfo: userInfo,
  categories: categorySlice,
  products: productSlice,
  orders: orderSlice,
  profile: profileSlice,
  users: userSlice,
  blogs: blogSlice,
  carts: cartSlice,
  wishlists: wishlistSlice
})
