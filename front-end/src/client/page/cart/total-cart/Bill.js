import React from 'react'
import { Box, Typography, Button } from '@mui/material';

const Bill = (props) => {
  const {
    orderItems,
    address,
    payment,
    total,
    handleCreateOrder,
    handleCancel,
    commune,
    district,
    province,
    shipping
  } = props

  return (
    <Box sx={{ border: '1px solid gray', padding: '20px', textAlign: 'center' }}>
      <Typography>Thông tin đơn hàng của bạn</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
        <Typography align="left" sx={{ width: '55%' }}>Tên sản phẩm </Typography>
        <Typography align="left" sx={{ width: '20%' }}>Số lượng</Typography>
        <Typography align="left" sx={{ width: '25%' }}>Gía</Typography>
      </Box>
        {orderItems && orderItems.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', margin: '20px 0', borderBottom: '1px solid gray' }}>
            <Typography align="left" sx={{ width: '55%' }}>{item.name}: </Typography>
            <Typography align="left" sx={{ width: '20%' }}>{item.quantity}</Typography>
            <Typography align="left" sx={{ width: '25%' }}>{item.price} đ</Typography>
          </Box>
        ))}
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0', borderBottom: '1px solid gray' }}>
          <Typography align="left" sx={{ width: '75%' }}>Phí ship: </Typography>
          <Typography align="left" sx={{ width: '25%' }}>{shipping} đ</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0', borderBottom: '1px solid gray' }}>
          <Typography align="left" sx={{ width: '20%' }}>Địa chỉ: </Typography>
          <Typography align="left" sx={{ width: '80%' }}>{address.apartmentNumber + '/' + commune.name + '/' +  district.name + '/' + province.name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0', borderBottom: '1px solid gray' }}>
          <Typography align="left" sx={{ width: '75%' }}>Hình thức thanh toán: </Typography>
          <Typography align="left" sx={{ width: '25%' }}>
            {payment === '0' ? 'Trực tiếp' : 'Thanh toán qua Paypal'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0', borderBottom: '1px solid gray' }}>
          <Typography align="left" sx={{ width: '75%' }}>Tổng tiền: </Typography>
          <Typography align="left" sx={{ width: '25%' }}>{total + shipping}</Typography>
        </Box>
        <Box>
          <Button variant="contained" onClick={handleCreateOrder}>
            {payment === '0' ? 'Mua Hàng' : 'Thanh toán ngay'}
          </Button>
          <Button variant="contained" color='error' onClick={handleCancel}>Hủy</Button>
        </Box>
    </Box>
  )
}
export default Bill
