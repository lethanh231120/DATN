import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InputBase, IconButton, Typography, Paper, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { getAllCategories } from './../../../../redux/categorySlice';
import { getLatestProducts } from './../../../../redux/productSlice';
import ProductRated from '../../product/product-rated/index'
import { Item, stylePaper } from '../../../components/assets/style'

const PageSort = ({ handleChangeCategory, handleChangeSearch, name, handleSubmitSearch }) => {
  let listCategory = []
  let listProduct = []

  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.categories)
  const { productsLatest } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getLatestProducts({ size: 3 }))
  }, [])

  if(categories.categories){
    listCategory = categories.categories
  }
  if(productsLatest.data){
    listProduct = productsLatest.data
  }

  return (
    <Grid item xs={2.5}>
      <Paper
        variant="outlined"
        sx={stylePaper}
      >
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
      <Item>
        <Paper variant="outlined" sx={{ borderRadius: '0px', padding: '25px', marginBottom: '30px' }}>
          <Typography variant='subtitle2'>Sản phẩm mới nhất</Typography>
          {listProduct && listProduct.map((item, index) => (
            <ProductRated
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              rating={item.rating}
              image={item.listImage}
            />
          ))}
        </Paper>
      </Item>
    </Grid>
  )
}
export default PageSort
