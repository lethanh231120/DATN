import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Box, FormControl, Button, Typography, Rating, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { postProductReview } from '../../../../redux/productSlice.js'
import { CssTextField } from './assets/styles.js'
import './assets/style.scss'


const FormComment = ({ productId, ratingProduct }) => {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = useState(ratingProduct)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(state => state.userInfo)

  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      comment: ''
    }
  })

  const handleSubmitComment = (data) => {
    const info = {
      comment: data.comment,
      rating
    }
    if(isAuthenticated){
      dispatch(postProductReview({ id: productId, info: info }))
      reset()
    }else{
      setOpen(true)
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleSubmitComment)}
    >
      <Box sx={{ margin: '20px 0' }}>
        <Typography variant='subtitle2'>Đánh giá (*)</Typography>
        <Rating name="size-medium" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}/>
      </Box>
      <FormControl className='text-aria' sx={{ margin: '7px 0 20px 0' }} >
        <Typography variant='subtitle2'>Thêm bình luận</Typography>
        <Controller
          name='comment'
          control={control}
          render={({ field }) => (
            <CssTextField
              {...field}
              multiline
              placeholder='Thêm ý kiến của bạn về sản phẩm này'
              minRows={4}
            />
          )}
        />
      </FormControl>
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Đăng nhập ngay để bình luận
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => navigate('/login')} variant="contained">Đăng nhập ngay</Button>
            <Button onClick={() => setOpen(false)} variant="contained" color='error'>Hủy</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Button type='submit' variant='contained'>Gửi</Button>
    </Box>
  )
}
export default FormComment
