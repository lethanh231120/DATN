import React, { useEffect } from 'react'
import { Box, Typography, Avatar, Rating } from "@mui/material";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../../redux/userSlice';

const Comment = ({ date, userId, comment, rating }) => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUserById(userId))
  }, [])

  return (
    <Box sx={{ display: 'flex', marginTop: '15px' }}>
      <Avatar src={users && users.image} variant="square"/>
      <Box sx={{ border: '1px solid #e0e0e0', width: '100%', padding: '10px', marginLeft: '20px' }}>
        <Box variant='caption' sx={{ display: 'flex', marginBottom: '10px' }}>
          <Rating name="size-small" value={rating} readOnly size="small" />
          <Typography variant='body2'> lethanh  -  {moment(date).format('lll')}</Typography>
        </Box>
        <Typography variant='subtitle1'>{comment}</Typography>
      </Box>
    </Box>
  )
}
export default Comment
