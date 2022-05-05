import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Lottie from "lottie-react";
import { Container, Box, Grid, Button, Typography, Avatar } from '@mui/material';
import { styled } from "@mui/material/styles";
import AnimatedPage from '../../animation-page/AnimatedPage'
import securityAccount from '../../lotties/cloud-computing-security.json'
import Footer from '../../layouts/footer';
import { getProfile } from '../../../redux/Profile';
import { Item } from '../../components/assets/style'
import { styleBox, styleAvatar } from './assets/style'

const StyleButton = styled(Button)(() => ({
  borderRadius: '3px',
  fontSize: '12px',
  width: '110px',
  margin: '0px auto',
  textTransform: 'none',
  marginTop: '10px'
}))

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profile } = useSelector(state => state.profile)

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <AnimatedPage>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <Box sx={{ padding: '30px', border: '1px solid #eee', marginTop: '40px' }} >
                  <Box sx={styleBox}>
                    <Avatar
                      alt='avatar-official'
                      variant='square'
                      sx={styleAvatar}
                      src={profile && profile.image}
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Item>
                        <Typography sx={{ margin: '10px' }}>Họ đệm</Typography>
                        <Typography sx={{ margin: '10px' }}>Tên </Typography>
                        <Typography sx={{ margin: '10px' }}>Địa chỉ email</Typography>
                        <Typography sx={{ margin: '10px' }}>Dịa chỉ hiện tại</Typography>
                        <Typography sx={{ margin: '10px' }}>Số điện thoại</Typography>
                      </Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Item>
                        <Typography sx={{ margin: '10px' }}>{profile && profile.first_name}</Typography>
                        <Typography sx={{ margin: '10px' }}>{profile && profile.last_name}</Typography>
                        <Typography sx={{ margin: '10px' }}>{profile && profile.email}</Typography>
                        <Typography sx={{ margin: '10px' }}>{profile && profile.address}</Typography>
                        <Typography sx={{ margin: '10px' }}>{profile && profile.phone}</Typography>
                      </Item>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '40%', margin: '0px auto' }}>
                      <StyleButton variant="contained">
                        <Link to='../../edit-profile'>Edit Profile</Link>
                      </StyleButton>
                      <StyleButton
                        onClick={handleCancel}
                        variant='contained'
                        color='error'
                      >
                        Hủy
                      </StyleButton>
                    </Box>
                  </Grid>
                </Box>
              </Item>
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
        </Container>
      </Container>
      <Footer/>
    </AnimatedPage>
  )
}
export default Profile
