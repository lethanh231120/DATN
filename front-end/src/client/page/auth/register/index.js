import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
  Box,
  FormControl,
  Link,
  Container,
  IconButton,
  Typography,
  Paper,
  Input,
  Avatar,
} from '@mui/material'
import { CssTextField, StyledBox, StyleButton } from '../../assets/styles.js'
import '../../assets/style.scss'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { post } from '../../../../api/BaseRequest'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, 'Trường này phải lả số diện thoại')
    .required('Vui lòng nhập số diện thoại'),
  first_name: Yup.string()
    .required('Nhập họ đệm của bạn')
    .max(50, 'Họ đệm không được quá 50 ký tự'),
  last_name: Yup.string()
    .required('Nhập tên của bạn')
    .max(50, 'Tên không được quá 50 ký tự'),
  email: Yup.string()
    .email('Nhập điạ chỉ email')
    .required('Bạn chưa nhập địa chỉ email'),
  address: Yup.string()
    .required('Bạn chưa nhập địa chỉ hiện tại')
    .max(255, 'địa chỉ không được quá 255 ký tự'),
  password: Yup.string()
    .min(6, 'Mật khẩu không được nhỏ hơn 6 ký tự')
    .max(30, 'Mật khẩu không được dài hơn 30 ký tự')
    .required('Bạn chưa nhập mật khẩu'),
})

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [image, setImage] = useState('')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const handleSubmitRegister = async(data) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    }
    try{
      const formData = new FormData()
      Object.keys(data).forEach(key => formData.append(`${key}`, data[key]))
      formData.append('image', image)
      formData.append('isAdmin', false)
      await post('users', formData, config)
    }catch(error){
      error?.response?.data && setError('server_error', {
        type: 'manual',
        message: error.response.data.message
      })
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container component='main' maxWidth='sm'>
      <Paper elevation={6}>
        <StyledBox className='box-container'
          component='form'
          onSubmit={handleSubmit(handleSubmitRegister)}
        >
          <Typography
            component='h1'
            variant='h5'
            sx={{ color: '#2b78e4', fontWeight: 'bold' }}
          >
            Đăng ký tài khoản
          </Typography>
          <Box className='grid-item grid-avatar'>
            <Avatar
              alt='avatar'
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={image ? (URL.createObjectURL(image)) : '/images/banner1.jpg'}
            />
            <Link className='input-file-avatar' component='label'>
              choose file
              <Input type='file'
                onChange={(e) => setImage(e.target.files[0])}
                sx={{ display: 'none' }} />
            </Link>
          </Box>
          <FormControl className='control' sx={{ marginTop: '7px' }}>
            <Controller
              render={({ field }) => (
                <CssTextField
                  {...field}
                  placeholder="Họ đệm"
                  className={`${errors?.first_name?.type === 'required' ? 'grid-item-edit-profile-error' : 'grid-item-edit-profile'}`}
                  error={!!errors.first_name}
                  helperText={errors.first_name ? errors.first_name.message : null}
                />
              )}
              name='first_name'
              control={control}
            />
          </FormControl>
          <FormControl className='control' sx={{ marginTop: '7px' }}>
            <Controller
              name='last_name'
              control={control}
              render={({ field }) => (
                <CssTextField
                  {...field}
                  placeholder="Tên của bạn"
                  className={`${errors?.last_name?.type === 'required' ? 'grid-item-edit-profile-error' : 'grid-item-edit-profile'}`}
                  error={!!errors.last_name}
                  helperText={errors.last_name ? errors.last_name.message : null}
                />
              )}
            />
          </FormControl>
          <FormControl className='control' sx={{ marginTop: '7px' }}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <CssTextField
                  type='email'
                  {...field}
                  placeholder="Địa chỉ email"
                  className={`${errors?.email?.type === 'required' || errors?.email?.type === 'pattern' ? 'grid-item-edit-profile-error' : 'grid-item-edit-profile'}`}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : null}
                />
              )}
            />
          </FormControl>
          <FormControl className='control' sx={{ marginTop: '7px' }}>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <CssTextField
                  {...field}
                  placeholder="Số điện thoại"
                  className={`${errors?.phone?.type === 'required' || errors?.phone?.type === 'pattern' ? 'grid-item-edit-profile-error' : 'grid-item-edit-profile'}`}
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : null}
                />
              )}
            />
          </FormControl>
          <FormControl className='control' sx={{ marginTop: '7px' }} >
            <Controller
              name='address'
              control={control}
              render={({ field }) => (
                <CssTextField
                  {...field}
                  placeholder="Địa chỉ"
                  className={`${errors?.address?.type === 'required' ? 'grid-item-edit-profile-error' : 'grid-item-edit-profile'}`}
                  error={!!errors.address}
                  helperText={errors.address ? errors.address.message : null}
                />
              )}
            />
          </FormControl>
          <FormControl className='control' sx={{ marginTop: '7px' }} >
            {/* <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <CssTextField
                  {...field}
                  type="password"
                  placeholder="Mật khẩu"
                  className={`${errors?.password?.type === 'required' || errors?.password?.type === 'maxLength' ? 'grid-item-edit-profile-error' : 'grid-item-edit-profile'}`}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : null}
                />
              )}
            /> */}
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <CssTextField
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  // className={`${errors?.password?.type === 'required' || errors?.password?.type === 'maxLength' ? 'grid-item-edit-profile-error' : 'grid-item-edit-profile'}`}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : null}
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
          </FormControl>
          {errors.server_error && (
            <Typography color='error.main' variant='caption' sx={{ width: '100%' }}>
              {errors.server_error.message}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
            <StyleButton
              type='submit'
              variant='contained'
            >
              Đăng ký
            </StyleButton>
            <StyleButton
              onClick={handleCancel}
              variant='contained'
              color='error'
            >
              Hủy
            </StyleButton>
          </Box>
        </StyledBox>
      </Paper>
    </Container>
  )
}
