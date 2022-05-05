import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { Avatar, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ListCart = ({ handleDeleteCart, listProduct, isActive, handleAddOrder, message }) => {
  const navigate = useNavigate()

  const subtotal = (price, discount, quantity) => {
    return (parseInt(price) - Math.floor((parseInt(discount)*(parseInt(price))) / 100)) * quantity
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <TableContainer>
      <Box sx={{ width: '100%', textAlign: 'right', marginBottom: '15px' }}>
        <Link to='../my-order'>
          <Button variant="contained">Đơn hàng của tôi</Button>
        </Link>
        <Button variant='contained' color='error' onClick={handleCancel}>Quay lại</Button>
      </Box>
      <Table sx={{ border: '1px solid #eee', margin: '0 0 50px 0' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Tên sản phẩm</TableCell>
            <TableCell align="center">Gía</TableCell>
            <TableCell align="center">Chiết khấu</TableCell>
            <TableCell align="center">Số lượng</TableCell>
            <TableCell align="center">Thành tiền</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listProduct.map((product, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                <ClearIcon
                  sx={{ cursor: 'pointer'}}
                  onClick={() => handleDeleteCart(product._id)}
                />
              </TableCell>
              <TableCell align="center">
                <Avatar
                  variant='square'
                  sx={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  src={product.image}
                />
              </TableCell>
              <TableCell align="center">{product.name}</TableCell>
              <TableCell align="center">{product.price} đ</TableCell>
              <TableCell align="center">{product.discount} %</TableCell>
              <TableCell align="center">{product.quantity}</TableCell>
              <TableCell align="center">
                {subtotal(product.price, product.discount, product.quantity)} đ
              </TableCell>
              <TableCell align="center">
                <Button
                  color='primary'
                  variant={(isActive(product._id) === true) ? 'contained' : 'outlined'}
                  onClick={() => handleAddOrder(product)}
                >
                  Chọn
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {message && <Typography color='red'>{message}</Typography>}
    </TableContainer>
  )
}

export default ListCart
