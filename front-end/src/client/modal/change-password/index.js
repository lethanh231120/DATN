import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { changPassword } from '../../../redux/Profile'

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset'
    }
  }
})

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Mật khẩu cũ không được nhỏ hơn 6 ký tự')
    .max(30, 'Mật khẩu cũ không được lớn hơn 30 ký tự')
    .required('Bạn chưa nhập mật khẩu cũ'),
  newPassword: Yup.string()
    .min(6, 'Mật khẩu mới không được nhỏ hơn 6 ký tự')
    .max(30, 'Mật khẩu mới không được lớn hơn 30 ký tự')
    .required('Bạn chưa nhập mật khẩu mới'),
  confirmPassword: Yup.string()
    .required('Bạn chưa nhập lại trường này')
    .oneOf([Yup.ref('newPassword'), null], 'Nhập lại mật khẩu không đúng với mật khẩu mới')
})

export default function ChangePass({ onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async(data) => {
    try {
      dispatch(changPassword(data))
      onClose()
      reset()
    } catch (error) {
      error?.response?.data &&
        setError('server_error', {
          type: 'manual',
          message: error.response.data.message
        })
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          component='h1'
          variant='h5'
          sx={{ color: '#2b78e4', fontWeight: 'bold' }}
        >
          Đổi mật khẩu
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autocomplete='off'
          sx={{ mt: 1 }}
        >
          <Controller
            name='oldPassword'
            control={control}
            render={({ field }) => (
              <CssTextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                margin='normal'
                placeholder='Mật khẩu cũ'
                fullWidth
                error={!!errors.oldPassword}
                helperText={
                  errors.oldPassword ? errors.oldPassword.message : null
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge='end'
                      position='end'
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            )}
          />
          <Controller
            name='newPassword'
            control={control}
            render={({ field }) => (
              <CssTextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                margin='normal'
                fullWidth
                placeholder='Mật khẩu mới'
                error={!!errors.newPassword}
                helperText={errors.newPassword ? errors.newPassword.message : null}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge='end'
                      position='end'
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            )}
          />
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <CssTextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                margin='normal'
                fullWidth
                placeholder='Nhập lại mật khẩu'
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? errors.confirmPassword.message : null}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge='end'
                      position='end'
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            )}
          />
          {errors.server_error && (
            <Typography color='error.main' variant='caption'>
              {errors.server_error.message}
            </Typography>
          )}
          <Button
            disabled={!(isDirty && isValid)}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3 }}
          >
            Xác nhận
          </Button>
          <Button
            onClick={onClose}
            fullWidth
            variant='contained'
            sx={{ mt: 3 }}
          >
            Hủy
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
