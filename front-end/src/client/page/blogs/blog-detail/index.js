import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Typography, Paper, Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import Detail from './detail'
import ProductRated from '../../../components/product/product-rated/index'
import AnimatedPage from '../../../animation-page/AnimatedPage'
import { getAllCategories } from '../../../../redux/categorySlice';
import { getTopRatingProducts } from '../../../../redux/productSlice';
import { getBlogById } from '../../../../redux/blogSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  margin: '0 0 30px 0',
  boxShadow: 'none',
  borderBottom: '1px solid gray',
  borderRadius: '0px'
}));

const BlogDetail = () => {
  let listCategory = []
  let topProduct = []
  
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categories } = useSelector(state => state.categories)
  const { productsRating } = useSelector(state => state.products)
  const { blogs } = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(getBlogById(id))
  }, [])

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getTopRatingProducts({ size: 3 }))
  }, [])

  if(categories.categories){
    listCategory = categories.categories
  }
  if(productsRating.data){
    topProduct = productsRating.data
  }

  const handleChangeCategory = (id) => {
    navigate(`../../product-category/category/${id}`)
  }

  return (
    <AnimatedPage>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Box sx={{ marginTop: '50px' }}>
            <Grid container spacing={5}>
              <Grid item xs={2.7}>
                <Item sx={{ textAlign: 'left' }}>
                  <Paper variant="outlined" sx={{ borderRadius: '0px', padding: '25px', marginBottom: '30px' }}>
                    <Typography variant='h6'>Danh sách danh mục</Typography>
                    {listCategory && listCategory.map((item, index) => (
                      <Typography
                        key={index}
                        variant='subtitle2'
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleChangeCategory(item._id)}
                      >
                        {item.name}
                      </Typography>
                    ))}
                  </Paper>
                </Item>
                <Item sx={{ textAlign: 'left' }}>
                  <Paper variant="outlined" sx={{ borderRadius: '0px', padding: '25px', marginBottom: '30px' }}>
                    <Typography variant='subtitle2'>Sản phẩm bán chạy</Typography>
                    {topProduct && topProduct.map((product, index) => (
                      <ProductRated
                        key={index}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        image={product.listImage}
                      />
                    ))}
                  </Paper>
                </Item>
              </Grid>
              <Grid item xs={9.3}>
                <Item>
                  <Detail
                    content={blogs && blogs.content}
                    author={blogs && blogs.user}
                    image={blogs && blogs.image}
                    title={blogs && blogs.title}
                    productId={blogs && blogs.productId}
                  />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </AnimatedPage>
  )
}
export default BlogDetail
