import React, { useEffect } from 'react'
import { Typography, Avatar, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { searchProduct } from '../../../../redux/productSlice';

const BlogItem = ({ id, image, date, productId, title, content }) => {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(searchProduct({ id: productId }))
  }, [])

  return (
    <Box>
      <Avatar
        variant='square'
        sx={{ width: '100%', height: '400px', objectFit: 'cover' }}
        src={image}
      />
      <Box sx={{ padding: '30px 40px', marginBottom: '40px', backgroundColor: '#f7f7f7' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='subtitle1'>
            Tạo bởi Admin
            | {moment(date).format('lll')}</Typography>
          <Typography variant='subtitle1'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`${id}`}>
                <ChatBubbleIcon sx={{ fontSize: '16px', margin: '0 5px', cursor: 'pointer' }}/>
                {products && products.numberOfReviews} Bình luận
              </Link>
            </Box>
          </Typography>
        </Box>
        <Typography variant='h5' sx={{ color: '#000', marginTop: '5px', fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant='subtitle1' sx={{ margin: '30px 0'}}>{content}</Typography>
        <Link to={`${id}`}>
          <Button variant="outlined" sx={{ borderRadius: '0px' }}>Xem thêm</Button>
        </Link>
      </Box>
    </Box>
)
}
export default BlogItem
