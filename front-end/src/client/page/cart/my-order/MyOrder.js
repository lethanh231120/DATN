import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { getMyOrders } from '../../../../redux/orderSlice';
import { del } from '../../../../api/BaseRequest';
import Footer from '../../../layouts/footer';
import Main from '../../../components/main';
import AnimatedPage from '../../../animation-page/AnimatedPage'

const MyOrder = () => {
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { myOrder } = useSelector(state => state.orders)

  useEffect(() => {
    dispatch(getMyOrders())
  }, [deleted === true])

  const renderProductName = (list) => {
    return ((list !== undefined) && list.map(item => <Typography key={item._id}>{item.name}</Typography>))
  }

  const handleDeleteOrder = async(id) => {
    try{
      await del(`orders/${id}`)
      setDeleted(true)
    }catch(error){
      error?.response?.data && setError(error.response.data.message)
      setOpen(true)
      setDeleted(false)
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <AnimatedPage>
      <Main/>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6'>Đơn hàng của tôi</Typography>
            <Button variant='contained' color='error' onClick={handleCancel}>Quay lại</Button>
          </Box>
          <TableContainer>
            <Table sx={{ border: '1px solid #eee', margin: '0 0 50px 0' }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Mã đơn hàng</TableCell>
                  <TableCell align="center">Tên sản phẩm</TableCell>
                  <TableCell align="center">Địa chỉ giao</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Tổng tiền</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myOrder && myOrder.map((order) => (
                  <TableRow
                    key={order._id}
                  >
                    <TableCell align="center">{order._id}</TableCell>
                    <TableCell align="center">{renderProductName(order.orderItems)}</TableCell>
                    <TableCell align="center">{order.shippingAddress} %</TableCell>
                    <TableCell align="center">{order.status}</TableCell>
                    <TableCell align="center">{order.totalPrice} đ</TableCell>
                    <TableCell align="center">
                      {order.status !== 'Hoàn thành' &&
                        <Button variant="contained" color='error' onClick={() => handleDeleteOrder(order._id)}>Hủy đơn</Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>{error && error}</DialogTitle>
              <DialogActions>
                <Button onClick={() => setOpen(false)} variant="contained">Đã hiểu</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Container>
      </Container>
      <Footer/>
    </AnimatedPage>
  )
}
export default MyOrder
