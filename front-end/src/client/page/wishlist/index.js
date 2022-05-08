import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar,Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack,Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AnimatedPage from '../../animation-page/AnimatedPage'
import Footer from '../../layouts/footer';
import Main from '../../components/main';
import { getAllWishlist, deleteWishList } from './../../../redux/wishlistSlice';
import { postCart } from './../../../redux/cartSlice'

export default function BasicTable() {
  let listProduct = []

  const dispatch = useDispatch()
  const { wishlists, message } = useSelector(state => state.wishlists)
  const { isAuthenticated } = useSelector(state => state.userInfo)

  useEffect(() => {
    (isAuthenticated && dispatch(getAllWishlist()))
  }, [message === 'wishlist deleted'])

  if(wishlists.products){
    listProduct = wishlists.products
  }

  const handleDeleteWishList = (id) => {
    dispatch(deleteWishList(id))
  }

  const subtotal = (price, discount) => {
    return (parseInt(price) - Math.floor((parseInt(discount)*(parseInt(price))) / 100))
  }

  const handleAddToCart = (name, price, discount, image, productId, id) => {
    const data = {
      name,
      price,
      discount,
      quantity: 1,
      image,
      productId
    }
    dispatch(postCart(data))
    dispatch(deleteWishList(id))
  }

  return (
    <AnimatedPage>
      <Main link='wishlist' title='WishList'/>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Typography variant='h5' sx={{ margin: '40px 0 20px 0' }}>Sản phẩm yêu thích của bạn</Typography>
          <TableContainer>
            <Table sx={{ border: '1px solid #eee', margin: '20px 0' }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Tên sản phẩm</TableCell>
                  <TableCell align="center">Gía bán</TableCell>
                  <TableCell align="center">Chiết khấu</TableCell>
                  <TableCell align="center">Thành tiền</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listProduct.map((product, index) => (
                  <TableRow
                    key={index}
                  >
                    <TableCell align="center">
                      <ClearIcon
                        sx={{ cursor: 'pointer'}}
                        onClick={() => handleDeleteWishList(product._id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Avatar
                        variant='square'
                        sx={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        src={product.image}
                      />
                    </TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{product.price} đ</TableCell>
                    <TableCell align="center">{product.discount} %</TableCell>
                    <TableCell align="center">
                      {subtotal(product.price, product.discount)} đ
                    </TableCell>
                    <TableCell align="center">
                      <Stack spacing={2} direction="row">
                        <Button
                          variant="outlined"
                          onClick={() => handleAddToCart(product.name, product.price, product.discount, product.image, product.productId, product._id)}
                        >
                          Thêm vào giỏ hàng
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Container>
      <Footer/>
    </AnimatedPage>
  );
}
