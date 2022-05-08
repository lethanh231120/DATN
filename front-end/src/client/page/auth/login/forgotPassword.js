import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Container,
  TextField,
  Typography,
  Button, Dialog, DialogActions, DialogTitle
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { post } from '../../../../api/BaseRequest'

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset'
    }
  }
})

const defaultValues = {
  email: ''
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email chưa đúng định dạng')
    .required('Bạn chưa nhập địa chỉ email')
})

export default function ForgotPassword({ onClose }) {
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async(data) => {
    try{
      await post('users/forgot-password', data)
      setError('Mật khẩu đã được gửi tới email của bạn. Vui lòng kiểm tra email!')
    }catch(error){
      error?.response?.data && setError(error.response.data.message)
    }
    setOpen(true)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Typography
          component='h1'
          variant='h6'
          sx={{ color: '#2b78e4' }}
        >
          Nhập địa chỉ email để lấy lại mật khẩu
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autocomplete='off'
        >
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <CssTextField
                {...field}
                margin='normal'
                placeholder='Nhập địa chỉ email'
                fullWidth
                error={!!errors.email}
                helperText={
                  errors.email
                    ? errors.email.message
                    : null
                }
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '140px' }}>
            <Button
              type='submit'
            >
              Gửi
            </Button>
            <Button
              onClick={onClose}
              color='error'
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Box>
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle id="alert-dialog-title">
            {error && error}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => navigate('/')} variant="contained">Đồng ý</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  )
}
