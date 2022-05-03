import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

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
    console.log(data)
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
          variant='subtitle2'
          sx={{ color: '#2b78e4' }}
        >
          Quên mật khẩu
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
              variant='contained'
            >
              Gửi
            </Button>
            <Button
              onClick={onClose}
              variant='contained'
              color='error'
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
