import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import {
  Button,
  Box,
  Container,
  Typography,
  IconButton,
  TextField,
  CircularProgress
} from '@mui/material'

import { styled } from '@mui/material/styles'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { post } from '../../../../api/BaseRequest'
import { setCookie, STORAGEKEY } from '../../../../ultils/storage/index'
import { getUserInfo } from './../../../../redux/userInfo';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset'
    }
  }
})

const defaultValues = {
  password: '',
  email: ''
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6')
    .max(30, 'Password too long')
    .required('Password is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required')
})

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async(value) => {
    try{
      const data = await post('user/login', value)
      reset()
      if(data.token){
        await setCookie(STORAGEKEY.ACCESS_TOKEN, data.token)
        await dispatch(getUserInfo())
        if(data.isAdmin === true){
          navigate('../admin')
        }else{
          navigate('../')
        }
      }
    }catch(error){
      error?.response?.data && setError('server_error', {
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
      {isSubmitting && (
        <CircularProgress
          disableShrink
          sx={{ display: 'flex', margin: 'auto' }}
        />
      )}
      <Box
        sx={{
          marginTop: 8,
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
          Relipa Portal
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <CssTextField
                {...field}
                type='email'
                margin='normal'
                fullWidth
                autoFocus={true}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : null}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <CssTextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                margin='normal'
                fullWidth
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
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
