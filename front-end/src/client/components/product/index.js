import React, { useState, useEffect } from 'react'
import AnimatedPage from '../../animation-page/AnimatedPage'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Avatar, Box, Grid } from '@mui/material'
import { searchProduct } from '../../../redux/productSlice';
import Main from '../main/index'
import Footer from '../../layouts/footer/index'
import PageSort from '../page-sort/sort-left/index';
import { styleAvatar, Item } from '../../components/assets/style'

const ListProduct = () => {
  const [categoryId, setCategoryId] = useState('625960d79091e3b48bc4bfb9')
  const [name, setName] = useState('')
  let listProduct = []

  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(searchProduct({ categoryId: categoryId }))
  }, [categoryId])


  if(products.products){
    listProduct = products.products
  }

  const handleChangeCategory = (id) => {
    setCategoryId(id)
  }

  const handleChangeSearch = (e) => {
    setName(e.target.value)
  }

  const handleSubmitSearch = () => {
    const params = {
      categoryId,
      name
    }
    dispatch(searchProduct(params))
  }

  return (
    <AnimatedPage>
      <Main link='product-category' title='List Product'/>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Box sx={{ marginTop: '50px' }}>
            <Grid container spacing={5}>
              <PageSort
                handleChangeCategory={handleChangeCategory}
                name={name}
                handleChangeSearch={handleChangeSearch}
                handleSubmitSearch={handleSubmitSearch}
              />
              <Grid item xs={9.5}>
                <Grid container item spacing={5}>
                  {listProduct && listProduct.map((item, index) => (
                    <Grid item xs={3} key={index}>
                      <Item>
                        <Link to={`../../product/${item._id}`}>
                          <Avatar
                            variant='square'
                            sx={styleAvatar}
                            src={item.listImage[0]}
                          />
                          <Box sx={{ textAlign: 'center', marginTop: '10px' }}>{item.name} ({item.countInStock})</Box>
                        </Link>
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
      <Footer/>
    </AnimatedPage>
  )
}
export default ListProduct
