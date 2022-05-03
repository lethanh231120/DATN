import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

 const TotalMoney = (props) => {
  const { total, error, shipping } = props

  return (
    <>
      <Typography variant='h6' sx={{ margin: '10px 0' }}>Tổng số giỏ hàng</Typography>
      <TableContainer>
        <Table sx={{ border: '1px solid #eee', margin: '0 0 20px 0' }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#eee', width: '50%' }}>Tổng tiền đơn hàng</TableCell>
              <TableCell align="left">{total} đ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#eee', width: '50%' }}>Phí ship</TableCell>
              <TableCell align="left">
                <Typography variant='body2'>{shipping} đ</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#eee', width: '50%' }}>Thành tiền</TableCell>
              <TableCell align="left">{total ? (total + shipping) : '0'} đ</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography color='red'>{error}</Typography>
      </TableContainer>
    </>
  )
}
export default TotalMoney
