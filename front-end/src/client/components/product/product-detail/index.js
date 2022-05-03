import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Button, Paper, Grid, Rating, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import AnimatedPage from '../../../animation-page/AnimatedPage'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SlideProduct from './Swiper';
import Describe from './Describe';
import RatedProduct from './RatedProduct';
import Footer from '../../../layouts/footer';
import Main from '../../main';
import { searchProduct } from '../../../../redux/productSlice';
import { getCategoryById } from '../../../../redux/categorySlice'
import { postCart } from '../../../../redux/cartSlice';
import { getUserInfo } from './../../../../redux/userInfo';

const CssButton = styled(Button)(({ theme }) => ({
  minWidth: '45px',
  height: '45px',
  border: '1px solid #e0e0e0',
  cursor: 'pointer',
  padding: '6px 8px',
  borderRadius: '0px',
  color: '#000',
  '&:hover':{
    backgroundColor: '#000',
    color: '#fff',
  }
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  textAlign: 'left',
  boxShadow: 'none'
}));

const styleBox = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '400px'
}

const styleTypography = {
  width: '45px',
  height: '45px',
  border: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  const [errorBuy, setErrorBuy] = useState('')
  const [open, setOpen] = React.useState(false);

  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, status } = useSelector(state => state.products)
  const { categories } = useSelector(state => state.categories)
  const { isAuthenticated } = useSelector(state => state.userInfo)
  let Product

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  useEffect(() => {
    dispatch(searchProduct({ id: id }))
  }, [id, status === 'create review successfully'])

  if(products.products){
    Product = products.products[0]
  }

  useEffect(() => {
    if(Product && Product.categoryId){
      dispatch(getCategoryById(Product.categoryId))
    }
  }, [Product])

  const handleAdd = () => {
    if(quantity < Product.countInStock){
      setQuantity(prev => prev + 1)
    }else{
      setError('Số lượng hàng trong kho không đủ')
    }
  }

  const handleRemove = () => {
    if(quantity > 1){
      setQuantity(prev => prev - 1)
      setError('')
    }else{
      setQuantity(1)
    }
  }

  const handleAddToCart = () => {
    if(isAuthenticated){
      const data = {
        name: Product.name,
        quantity,
        image: Product.listImage[0],
        price: Product.price,
        discount: Product.discount,
        productId: id
      }
      dispatch(postCart(data))
    }else{
      setOpen(true)
      setErrorBuy('Bạn chưa đăng nhập! Đăng nhập ngay để mua hàng')
    }
  }

  return (
    <AnimatedPage>
      <Main/>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Item>
                <SlideProduct listImage={Product && Product.listImage}/>
              </Item>
            </Grid>
            <Grid item xs={7}>
              <Item>
                <Box
                  sx={{
                    borderBottom: '1px solid #e0e0e0',
                    paddingBottom: '30px',
                    marginBottom: '30px'
                  }}
                >
                  <Typography variant='h6'>{Product && Product.name}</Typography>
                  <Rating
                    sx={{ margin: '20px 0' }}
                    readOnly
                    value={parseInt(Product && Product.rating)}
                    size="small"
                  />
                  <Box sx={{ display: 'flex'}}>
                    <Typography
                      variant='h5'
                      sx={{
                        textDecoration: 'line-through',
                        marginRight: '15px'
                      }}
                    >
                      {Product && Product.price} đ
                    </Typography>
                    <Typography
                      variant='h5'
                      color='red'
                    >
                      {(parseInt(Product && Product.price) - Math.floor((parseInt(Product && Product.discount)*(parseInt(Product && Product.price))) / 100)).toString()} đ
                    </Typography>
                  </Box>
                  <Typography sx={{ margin: '20px 0' }}>{Product && Product.description}</Typography>
                  <Box sx={styleBox}>
                    <Typography variant='subtitle1'>Số lượng:</Typography>
                    <CssButton>
                      <RemoveIcon onClick={handleRemove}/>
                    </CssButton>
                    <Typography sx={styleTypography}>{quantity}</Typography>
                    <CssButton>
                      <AddIcon onClick={handleAdd}/>
                    </CssButton>
                    <CssButton variant="outlined" onClick={handleAddToCart}>Thêm vào giỏ hàng</CssButton>
                  </Box>
                  <Typography color='error'>{error && error}</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle1'>SKU: {Product && Product._id}</Typography>
                  <Typography sx={{ margin: '10px 0' }}>
                    Categories: <Link to={`../../product-category/category/${categories._id}`}>{categories.name}</Link>
                  </Typography>
                </Box>
              </Item>
            </Grid>
          </Grid>
          <div>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {errorBuy && errorBuy}
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => navigate('/login')} variant="contained">Đăng nhập ngay</Button>
                <Button onClick={() => setOpen(false)} variant="contained" color='error'>Hủy</Button>
              </DialogActions>
            </Dialog>
          </div>
          <Describe
            description={Product && Product.description}
            dimensions={Product && Product.dimensions}
            weight={Product && Product.weight}
            reviews={Product && Product.reviews}
            productId={Product && Product._id}
            productName={Product && Product.name}
            ratingProduct={Product && Product.rating}
          />
          <RatedProduct/>
        </Container>
      </Container>
      <Footer/>
    </AnimatedPage>
  )
}
export default ProductDetail