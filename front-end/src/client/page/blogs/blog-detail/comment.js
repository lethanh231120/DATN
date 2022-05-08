import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Typography, Avatar, Box } from '@mui/material'
import { getUserById } from '../../../../redux/userSlice'

const Comment = ({ userId, date, comment }) => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUserById(userId))
  }, [userId])

  return (
    <Box sx={{ paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid gray' }}>
      <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginBottom: '30px' }}>
          <Avatar
            variant='square'
            alt="Remy Sharp"
            src={users && users.image}
            sx={{ width: 80, height: 80, marginRight: '20px' }}
          />
          <Box>
          <Typography variant='h6'>{(users && users.first_name) + '' + (users && users.last_name)}</Typography>
          <Typography variant='subtitle2' sx={{ display: 'flex', alignItems: 'center' }}>{moment(date).format('LLL')}</Typography>
          </Box>
        </Box>
        <Typography variant='body2'>{comment}</Typography>
    </Box>
  )
}
export default Comment
