import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Comment from './comment'
import { Typography, Avatar, Box, Button, TextField, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { getUserById } from '../../../../redux/userSlice'
import { getAllProductReviews } from './../../../../redux/productSlice';

const Detail = ({ content, author, image, productId }) => {
  let listReview = []
  
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)
  const { reviews } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getUserById(author))
  }, [author])

  useEffect(() => {
    dispatch(getAllProductReviews(productId))
  }, [productId])

  if(reviews.reviews){
    listReview = reviews.reviews
  }

  return (
    <>
      <Avatar
        variant='square'
        sx={{ width: '100%', height: '400px', objectFit: 'cover' }}
        src={image}
      />
      <Box sx={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid #000'}}>
        <Typography variant='body2' sx={{ margin: '30px 0' }}>
          {content}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
          <Avatar
            alt="Remy Sharp"
            src={users && users.image}
            sx={{ width: 80, height: 80, marginRight: '20px' }}
          />
          <Box>
            <Typography variant='h5'>Tạo bởi Admin</Typography>
            <Link to={`../author/${author}`}>
              Xem tất cả bài viết của Admin <ArrowRightAltIcon/>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: '#f2f2f2', padding: '30px' }}>
        {listReview && listReview.map((review, index) => (
          <Comment
            key={index}
            date={review.createdAt}
            userId={review.user}
            comment={review.comment}
          />
        ))}
      </Box>
    </>
  )
}
export default Detail
