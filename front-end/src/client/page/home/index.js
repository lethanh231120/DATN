import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Container, Box, Grid, Button, Typography } from '@mui/material';
import { styleTypography, Item } from '../../components/assets/style'
import { Banner } from '../../layouts/banner'
import Latest from '../latest/index'
import ProductDefault from '../../components/product/product-default'
import Paginate from '../../components/paginate/index'
import Sale from '../sale/index'
import Blog from '../blogs/blog-home/index'
import Footer from '../../layouts/footer/index'
import AnimatedPage from '../../animation-page/AnimatedPage'
import { getProducts } from '../../../redux/productSlice';
import { getBlogs } from '../../../redux/blogSlice';
import { getUserInfo } from '../../../redux/userInfo';
import './home.scss'

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  let listProduct = []
  let listBlog = []

  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)
  const { blogs } = useSelector(state => state.blogs)
  const { isAuthenticated } = useSelector(state => state.userInfo)

  useEffect(() => {
    dispatch(getProducts({ page: currentPage }))
  }, [currentPage])

  useEffect(() => {
    dispatch(getBlogs({ pageSize: 4 }))
  }, [])

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  if(products.products){
    listProduct = products.products
  }
  if(blogs.blogs){
    listBlog = blogs.blogs
  }

  const handlePageChange = (e, pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <AnimatedPage>
      <Banner/>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Latest/>
          <Box className='list-product'>
            <Typography variant='h4' sx={styleTypography}>Danh sách sản phẩm</Typography>
            <Grid container spacing={1}>
              <Grid container item spacing={3}>
                {listProduct.map((product, index) => (
                  <Grid key={index} item xs={2.4}>
                    <Item>
                      <ProductDefault
                        isAuthenticated={isAuthenticated}
                        name={product.name}
                        id={product._id}
                        image={product.listImage}
                        rating={product.rating}
                        price={product.price}
                        discount={product.discount}
                      />
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Paginate
            page={currentPage}
            pageCount={products.pages}
            handlePageChange={handlePageChange}
          />
          <Sale/>
          <Box sx={{ marginTop: '40px' }}>
            <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#000' }}>Đi đến bài viết</Typography>
            <Grid container spacing={2}>
              {listBlog && listBlog.map((blog, index) => (
                <Blog
                  key={index}
                  id={blog._id}
                  date={blog.createdAt}
                  content={blog.content}
                  title={blog.title}
                />
              ))}
            </Grid>
            <Link to='blogs'>
              <Box className='blogs-button'>
                <Button size='medium' variant="outlined">Xem thêm</Button>
              </Box>
            </Link>
          </Box>
        </Container>
      </Container>
      <Footer/>
    </AnimatedPage>
  )
}
export  default HomePage
