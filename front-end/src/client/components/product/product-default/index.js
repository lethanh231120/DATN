import React, { useEffect } from 'react'
import '../assets/product.scss'
import { Box, Paper, Avatar, Typography, Rating, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { StyleIcon } from '../assets/style'
import { Link, useNavigate } from 'react-router-dom'
import { styleAvatar } from '../../../components/assets/style'
import { postCart } from '../../../../redux/cartSlice';
import { postWishList } from '../../../../redux/wishlistSlice';
import { useDispatch } from 'react-redux';

const ProductDefault = ({ isAuthenticated, id, name, price, discount, rating , image}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);

  const handleAddToCart = () => {
    if(isAuthenticated){
      const data = {
        name,
        price,
        discount,
        quantity: 1,
        image: image && image[0],
        productId: id
      }
      dispatch(postCart(data))
    }else{
      setOpen(true)
    }
  }

  const handleAddWishlist = () => {
    if(isAuthenticated){
      const data = {
        name,
        price,
        discount,
        image: image && image[0],
        productId: id
      }
      dispatch(postWishList(data))
    }else{
      setOpen(true)
    }
  }

  return (
    <Paper elevation={3} className='product'>
      <Box className='product-image'>
        <Link to={`../../../product/${id}`}>
          <Avatar
            sx={styleAvatar}
            variant='square'
            src={image && image[0]}
          />
        </Link>
      </Box>
      <Box className='product-content'>
        <Box className="product-title">{name}</Box>
        <Box className="product-detail">
          <Box>
            <Typography
              variant='subtitle1'
              sx={{
                textDecoration: 'line-through',
                marginRight: '15px'
              }}
            >
              {price} đ
            </Typography>
            <Typography
              variant='subtitle1'
              color='red'
            >
              {(parseInt(price) - Math.floor((parseInt(discount)*(parseInt(price))) / 100)).toString()} đ
            </Typography>
          </Box>
          <Box className="product-evaluate">
            <Rating name="size-small" readOnly value={rating} size="small" />
          </Box>
        </Box>
      </Box>
      <Box className="product-icon">
        <StyleIcon>
          <ShoppingCartIcon
            sx={{ fontSize: '20px' }}
            onClick={handleAddToCart}
          />
        </StyleIcon>
        <StyleIcon>
          <FavoriteBorderIcon
            sx={{ fontSize: '20px' }}
            onClick={handleAddWishlist}
          />
        </StyleIcon>
        <StyleIcon>
          <Link to={`../../../product/${id}`}>
            <VisibilityIcon sx={{ fontSize: '20px' }}/>
          </Link>
        </StyleIcon>
      </Box>
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Đăng nhập để mua sản phẩm
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => navigate('/login')} variant="contained">Đăng nhập ngay</Button>
            <Button onClick={() => setOpen(false)} variant="contained" color='error'>Hủy</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Paper>
  )
}
export default ProductDefault
