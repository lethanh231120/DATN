import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Slider, Grid, IconButton, InputBase, Paper, Typography, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct, getTopRatingProducts } from './../../../../redux/productSlice';
import { getAllCategories } from './../../../../redux/categorySlice';
import AnimatedPage from '../../../animation-page/AnimatedPage'
import Main from '../../main'
import ProductRated from '../../product/product-rated/index'
import Footer from '../../../layouts/footer/index';
import ProductDefault from '../../product/product-default';
import { Item, stylePaper, CssButton } from '../../../components/assets/style'

function valuetext(value) {
  return value;
}

const SortByCategory = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState(id)
  const [price, setPrice] = useState([1000000, 3000000])
  let listProduct = []
  let topProduct = []
  let listCategory = []

  const dispatch = useDispatch()
  const { products, productsRating } = useSelector(state => state.products)
  const { categories } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(searchProduct({ categoryId: categoryId }))
  }, [categoryId])

  useEffect(() => {
    dispatch(getTopRatingProducts({ size: 3 }))
    dispatch(getAllCategories())
  }, [])

  if(products.products){
    listProduct = products.products
  }
  if(productsRating.data){
    topProduct = productsRating.data
  }
  if(categories.categories){
    listCategory = categories.categories
  }

  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  };

  const handleChangeSearch = (e) => {
    setName(e.target.value)
  }

  const handleClickCategory = (id) => {
    setCategoryId(id)
  }

  const handleSubmitSearch = () => {
    const params = {
      categoryId,
      name
    }
    dispatch(searchProduct(params))
  }

  const handleSubmitPrice = () => {
    dispatch(searchProduct({ price: `${price[0]},${price[1]}` }))
  }

  return (
    <AnimatedPage>
      <Main/>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
        <Box sx={{ marginTop: '50px' }}>
            <Grid container spacing={5}>
              <Grid item xs={2.5}>
                <Paper variant="outlined" sx={stylePaper}>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    value={name}
                    onChange={handleChangeSearch}
                  />
                  <IconButton onClick={handleSubmitSearch} sx={{ p: '7px' }}>
                    <SearchIcon/>
                  </IconButton>
                </Paper>
                <Item>
                  <Paper variant="outlined" sx={{ borderRadius: '0px', padding: '25px', marginBottom: '30px' }}>
                    <Typography variant='h6'>Categories</Typography>
                    {listCategory && listCategory.map((item, index) => (
                      <Typography
                        key={index}
                        variant='subtitle2'
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleClickCategory(item._id)}
                      >
                        {item.name}
                      </Typography>
                    ))}
                  </Paper>
                </Item>
                <Item>
                  <Paper variant="outlined" sx={{ borderRadius: '0px', padding: '25px', marginBottom: '30px' }}>
                    <Typography variant='h6'>Filter By Price</Typography>
                    <Slider
                      max={5000000}
                      getAriaLabel={() => 'Temperature range'}
                      value={price}
                      onChange={handleChangePrice}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                    />
                    <CssButton
                      sx={{ margin: '20px 0' }}
                      onClick={handleSubmitPrice}
                    >
                      Filter
                    </CssButton>
                    <Typography color='red'>Price: {price[0]} - {price[1]}</Typography>
                  </Paper>
                </Item>
                <Item>
                  <Paper variant="outlined" sx={{ borderRadius: '0px', padding: '25px', marginBottom: '30px' }}>
                    <Typography variant='subtitle2'>Top rated Product</Typography>
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
              <Grid item xs={9.5}>
                <Grid container item spacing={5}>
                  {listProduct && listProduct.map((item, index) => (
                    <Grid item xs={3} key={index}>
                      <Item>
                        <ProductDefault
                          id={item._id}
                          name={item.name}
                          price={item.price}
                          rating={item.rating}
                          image={item.listImage}
                        />
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
export default SortByCategory
