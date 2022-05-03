import { Route, Routes } from 'react-router-dom'
import PageSort from './client/components/page-sort/category/index'
import ProfilePage from '../src/client/page/profile/index'
import HomePage from '../src/client/page/home/index'
import ListProductPage from '../src/client/components/product/index'
import PageNotFound from '../src/client/page/404'
import BlogPage from '../src/client/page/blogs/index'
import BlogDetailPage from '../src/client/page/blogs/blog-detail/index'
import BlogAuthor from '../src/client/page/blogs/blog-author/index'
import AboutUsPage from '../src/client/page/about-us/index'
import ProductDetailPage from '../src/client/components/product/product-detail/index'
import WishListPage from '../src/client/page/wishlist/index'
import CartPage from '../src/client/page/cart/index'
import MyOrderPage from './client/page/cart/my-order/MyOrder'
import EditProfilePage from '../src/client/page/profile/edit-profile/index'
import LoginPage from '../src/client/page/auth/login/index'
import RegisterPage from '../src/client/page/auth/register/index'

//admin
import Category from '../src/admin/views/ui/category/Category'
import Product from '../src/admin/views/ui/product/Product'
import CreateProduct from '../src/admin/views/ui/product/CreateProduct'
import DetailProduct from '../src/admin/views/ui/product/DetailProduct'
import EditProduct from '../src/admin/views/ui/product/EditProduct'
import Order from '../src/admin/views/ui/order/Order'
import OrderDetail from '../src/admin/views/ui/order/OrderDetail'
import User from '../src/admin/views/ui/user/User'
import CreateUser from '../src/admin/views/ui/user/CreateUser'
import DetailUser from '../src/admin/views/ui/user/DetailUser'
import EditUser from '../src/admin/views/ui/user/EditUser'
import Blog from '../src/admin/views/ui/blog/Blogs'
import CreateBlog from '../src/admin/views/ui/blog/CreateBlog'
import DetailBlog from '../src/admin/views/ui/blog/DetailBlog'
import EditBlog from '../src/admin/views/ui/blog/EditBlog'
import StarterPage from '../src/admin/views/Starter'
import Admin from '../src/Layout/Admin'
import Profile from '../src/admin/views/ui/profile/Profile'
import EditProfile from '../src/admin/views/ui/profile/EditProfile'
import AdminLoginPage from '../src/client/page/auth/login/loginAdmin'

import Website from '../src//Layout/Website'
import { useSelector } from 'react-redux'
import { PrivateRoute } from './routers'
import React from 'react'
import TrashCategory from './admin/views/ui/category/Trash';
import TrashProduct from './admin/views/ui/product/Trash';
import TrashUser from './admin/views/ui/user/Trash';
import TrashBlog from './admin/views/ui/blog/Trash'

function App() {
  const { user } = useSelector(state => state.userInfo)
  return (
    <Routes>
      {/* page client */}
      <Route path="/" element={<Website />}>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<LoginPage />}/>
        <Route path='register' element={<RegisterPage />}/>
        <Route path='reset-password/:token' element={<RegisterPage />}/>

        <Route path='product'>
          <Route path='' element={<ListProductPage />} />
          <Route path=':id' element={<ProductDetailPage />} />
        </Route>

        <Route path='product-category'>
          <Route path='' element={<ListProductPage />} />
          <Route path='category/:id' element={<PageSort />} />
        </Route>

        <Route path='about-us' element={<AboutUsPage />} />

        <Route path='blogs'>
          <Route path='' element={<BlogPage />} />
          <Route path=':id' element={<BlogDetailPage />} />
          <Route path='author/:authorId' element={<BlogAuthor />} />
        </Route>

        <Route path='cart' element={<CartPage />}/>
        <Route path='my-order' element={<MyOrderPage />}/>
        <Route path='wishlist' element={<WishListPage />}/>
        <Route path='profile' element={<ProfilePage />} />
        <Route path='edit-profile' element={<EditProfilePage />}/>
        <Route path='*' element={<PageNotFound />} />
      </Route>

      {/* page admin */}
      <Route path='/admin' element={(user.isAdmin) ? <PrivateRoute component={Admin}/> : <AdminLoginPage/>}>
          <Route index element={<StarterPage />}/>
          <Route path='category' element={<Category />}/>
          <Route path='category/trash' element={<TrashCategory />}/>
          <Route path='create-product' element={<CreateProduct />}/>
          <Route path='list-product' element={<Product />}/>

          <Route path='edit-product/:id' element={<EditProduct />}/>
          <Route path='product'>
            <Route path='' element={<Product />}/>
            <Route path=':id' element={<DetailProduct />}/>
            <Route path='trash' element={<TrashProduct />}/>
          </Route>

          <Route path='order'>
            <Route path='' element={<Order />}/>
            <Route path=':id' element={<OrderDetail />}/>
          </Route>

          <Route path='my-profile' element={<Profile/>}/>
          <Route path='edit-profile' element={<EditProfile/>}/>
          <Route path='edit-user/:id' element={<EditUser/>}/>

          <Route path='user'>
            <Route path='' element={<User/>}/>
            <Route path='trash' element={<TrashUser />}/>
            <Route path=':id' element={<DetailUser/>}/>
          </Route>

          <Route path='create-user' element={<CreateUser/>}/>
          <Route path='create-blog' element={<CreateBlog />}/>

          <Route path='blog'>
            <Route path='' element={<Blog />}/>
            <Route path='trash' element={<TrashBlog />}/>
            <Route path=':id' element={<DetailBlog />}/>
          </Route>
          <Route path='edit-blog/:id' element={<EditBlog />}/>
      </Route>
    </Routes>
  );
}

export default App;
