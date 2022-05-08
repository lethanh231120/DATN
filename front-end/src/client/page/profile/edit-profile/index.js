import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import Lottie from "lottie-react";
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Grid,
  FormControl,
  Link,
  Container,
  Input,
  Avatar,
  Button, Dialog, DialogActions, DialogTitle
} from '@mui/material'
import AnimatedPage from '../../../animation-page/AnimatedPage'
import { styled } from "@mui/material/styles";
import securityAccount from '../../../lotties/cloud-computing-security.json'
import Footer from './../../../layouts/footer/index';
import { Item } from '../../../components/assets/style'
import { getProfile } from '../../../../redux/Profile';
import { CssTextField, StyleButton } from '../../assets/styles.js'
import '../../assets/style.scss'
import { put } from '../../../../api/BaseRequest'

const StyledBox = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}))

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
    .max(255, 'địa chỉ không được quá 255 ký tự')
})

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
}

const EditProfile = () => {
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profile } = useSelector(state => state.profile)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  useEffect(()=>{
    if (profile) {
      setValue('first_name', profile.first_name)
      setValue('last_name', profile.last_name)
      setValue('email', profile.email)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
    }
  }, [profile])

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const handleCancel = () => {
    navigate('/')
  }

  const handleSubmitFormEdit = async(data) => {
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
      await put('user/profile', formData, config)
      setMessage('Cập nhật thông tin thành công')
      setOpen(true)
    }catch(error){
      error?.response?.data && setMessage(error.response.data.message)
    }
  }

  return (
    <AnimatedPage>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StyledBox className='box-container'
                component='form'
                onSubmit={handleSubmit(handleSubmitFormEdit)}
              >
                <Box className='grid-item grid-avatar'>
                  <Avatar
                    alt='avatar'
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    src={(profile && !image) ? profile.image :
                      (profile && image) ? (URL.createObjectURL(image)) : '/images/banner1.jpg'}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '30%' }}>
                  <StyleButton
                    type='submit'
                    variant='contained'
                  >
                    Lưu
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
            </Grid>
            <Grid item xs={6}>
              <Item>
                <Box sx={{ margin: '0px auto', width: '70%', display: 'flex', alignItems: 'center' }}>
                  <Lottie
                    animationData={securityAccount}
                    loop={true}
                    autoplay={true}
                    />
                </Box>
              </Item>
            </Grid>
          </Grid>
          <div>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
          >
            <DialogTitle id="alert-dialog-title">
              {message && message}
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => navigate('/profile')} variant="contained">Đồng ý</Button>
            </DialogActions>
          </Dialog>
        </div>
        </Container>
      </Container>
      <Footer/>
    </AnimatedPage>
  )
}
export default EditProfile
