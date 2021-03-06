import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Avatar, Typography, Paper, Grid } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "@mui/material/styles";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AppsIcon from '@mui/icons-material/Apps';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Footer from '../../layouts/footer/index'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../latest/styles.css";
import { Autoplay, Pagination, FreeMode, Thumbs, Navigation } from "swiper";
import Main from '../../components/main';
import AnimatedPage from '../../animation-page/AnimatedPage'
import { styleAvatar } from '../../components/assets/style'
import { getAdmins } from '../../../redux/userSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: '8px',
  boxShadow: 'none'
}));
const styleBox = {
  backgroundColor: '#eee',
  color: '#000',
  cursor: 'pointer',
  padding: '15px 0',
  '&:hover': {
    backgroundColor: '#515151',
    color: '#fff'
  },
}
const slideAvatar = {
  width: '100%',
  height: '80vh',
  objectFit: 'cover',
  margin: '40px 0'
}
const styleIcon = {
  color: '#000',
  marginRight: '10px',
  cursor: 'pointer'
}
const styleTypography = { color: '#000', marginBottom: '20px' }

const AboutUs = () => {
  let listAdmin = []

  const dispatch = useDispatch()
  const { admins } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getAdmins())
  }, [])

  if(admins.data){
    listAdmin = admins.data
  }

  return (
    <AnimatedPage>
      <Main link='about-us' title='About Us'/>
      <Container maxWidth='xl'>
        <Container maxWidth='xl' sx={{ textAlign: 'center', marginTop: '40px' }}>
          <Typography variant='h6'>If You Wanted Get Model, How Would You Do It?</Typography>
          <Typography variant='subtitle2' sx={{ marginTop: '20px', color: 'gray' }}>Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.consequat vitae, eleifend ac, enim. Quisque rutrum. Aenean imperdiet.</Typography>
          <Swiper
            slidesPerView={1}
            loop={true}
            loopFillGroupWithBlank={true}
            navigation={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Avatar
                variant='square'
                sx={slideAvatar}
                src='../images/banner1.jpg'
              />
            </SwiperSlide>
            <SwiperSlide>
              <Avatar
                variant='square'
                sx={slideAvatar}
                src='../images/banner2.jpg'
              />
            </SwiperSlide>
            <SwiperSlide>
              <Avatar
                variant='square'
                sx={slideAvatar}
                src='../images/banner3.jpg'
              />
            </SwiperSlide>
          </Swiper>
          <Typography variant='h5' align='center'>Th??nh Vi??n Nh??m C???a Ch??ng T??i</Typography>
          <Box sx={{ margin: '30px 0 50px 0' }}>
            <Grid container spacing={1}>
              <Swiper
                slidesPerView={5}
                spaceBetween={10}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                className="mySwiper"
                loop={true}
              >
                {listAdmin && listAdmin.map((admin, index) => (
                  <SwiperSlide key={index}>
                    <Grid item xs={12}>
                      <Item sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={styleAvatar}
                          variant='square'
                          src={admin.image}
                        />
                        <Box sx={styleBox}>
                          <Typography variant='subtitle2'>{(admin.first_name) + ' ' + (admin.last_name)}</Typography>
                          <Typography variant='caption'>MANAGER</Typography>
                          <Box >
                            <FacebookIcon/>
                            <TwitterIcon/>
                            <LinkedInIcon/>
                          </Box>
                        </Box>
                      </Item>
                    </Grid>
                  </SwiperSlide>
                ))}
                <SwiperSlide>
                  <Grid item xs={12}>
                    <Item>
                      <Avatar
                        sx={styleAvatar}
                        variant='square'
                        src='../images/latest1.jpg'
                      />
                      <Box sx={styleBox}>
                        <Typography variant='subtitle2'>NEMO ENIM</Typography>
                        <Typography variant='caption'>MANAGER</Typography>
                        <Box >
                          <FacebookIcon/>
                          <TwitterIcon/>
                          <LinkedInIcon/>
                        </Box>
                      </Box>
                    </Item>
                  </Grid>
                </SwiperSlide>
                <SwiperSlide>
                  <Grid item xs={12}>
                    <Item>
                      <Avatar
                        sx={styleAvatar}
                        variant='square'
                        src='../images/latest1.jpg'
                      />
                      <Box sx={styleBox}>
                        <Typography variant='subtitle2'>NEMO ENIM</Typography>
                        <Typography variant='caption'>MANAGER</Typography>
                        <Box >
                          <FacebookIcon/>
                          <TwitterIcon/>
                          <LinkedInIcon/>
                        </Box>
                      </Box>
                    </Item>
                  </Grid>
                </SwiperSlide>
                <SwiperSlide>
                  <Grid item xs={12}>
                    <Item>
                      <Avatar
                        sx={styleAvatar}
                        variant='square'
                        src='../images/latest1.jpg'
                      />
                      <Box sx={styleBox}>
                        <Typography variant='subtitle2'>NEMO ENIM</Typography>
                        <Typography variant='caption'>MANAGER</Typography>
                        <Box >
                          <FacebookIcon/>
                          <TwitterIcon/>
                          <LinkedInIcon/>
                        </Box>
                      </Box>
                    </Item>
                  </Grid>
                </SwiperSlide>
                <SwiperSlide>
                  <Grid item xs={12}>
                    <Item>
                      <Avatar
                        sx={styleAvatar}
                        variant='square'
                        src='../images/latest1.jpg'
                      />
                      <Box sx={styleBox}>
                        <Typography variant='subtitle2'>NEMO ENIM</Typography>
                        <Typography variant='caption'>MANAGER</Typography>
                        <Box >
                          <FacebookIcon/>
                          <TwitterIcon/>
                          <LinkedInIcon/>
                        </Box>
                      </Box>
                    </Item>
                  </Grid>
                </SwiperSlide>
                <SwiperSlide>
                  <Grid item xs={12}>
                    <Item>
                      <Avatar
                        sx={styleAvatar}
                        variant='square'
                        src='../images/latest1.jpg'
                      />
                      <Box sx={styleBox}>
                        <Typography variant='subtitle2'>NEMO ENIM</Typography>
                        <Typography variant='caption'>MANAGER</Typography>
                        <Box >
                          <FacebookIcon/>
                          <TwitterIcon/>
                          <LinkedInIcon/>
                        </Box>
                      </Box>
                    </Item>
                  </Grid>
                </SwiperSlide>
                <SwiperSlide>
                  <Grid item xs={12}>
                    <Item>
                      <Avatar
                        sx={styleAvatar}
                        variant='square'
                        src='../images/latest1.jpg'
                      />
                      <Box sx={styleBox}>
                        <Typography variant='subtitle2'>NEMO ENIM</Typography>
                        <Typography variant='caption'>MANAGER</Typography>
                        <Box >
                          <FacebookIcon/>
                          <TwitterIcon/>
                          <LinkedInIcon/>
                        </Box>
                      </Box>
                    </Item>
                  </Grid>
                </SwiperSlide>
              </Swiper>
            </Grid>
          </Box>
          <Box sx={{ padding: '100px 0' }}>
            <Typography variant='h5' sx={{ padding: '20px' }}>L???ch S??? Megnor</Typography>
            <Grid container spacing={1}>
              <Grid container item spacing={3}>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <PublicIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>D??? S??? D???NG</Typography>
                        <Typography variant='caption'>Ch??ng t??i ???? suy ngh?? r???t nhi???u trong vi???c cung c???p cho b???n tr???i nghi???m t???t nh???t c?? th??? ????? gi??p c??ng vi???c c???a b???n tr??? n??n d??? d??ng h??n.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <ChatBubbleIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>H??? TR??? XU???T S???C</Typography>
                        <Typography variant='caption'>C??c m??-??un ???????c t??i li???u h??a ?????y ????? v???i c??c h?????ng d???n t???ng b?????c. truy c???p di???n ????n h??? tr??? cao c???p.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <FavoriteBorderIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>????N GI???N L?? ?????P</Typography>
                        <Typography variant='caption'>C??c ch??? ????? c???a ch??ng t??i kh??ng ch??? ???????c m?? h??a ?????c ????o, ch??ng ???????c x??y d???ng ????? cho kh??ch truy c???p c???a b???n th???y b???n quan t??m ?????n v??? ?????p v?? thi???t k??? nh?? th??? n??o.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <ViewInArIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>???????C CH??? T???O C???N TH???N</Typography>
                        <Typography variant='caption'>???????c m?? h??a v???i c??c ph????ng ph??p hay nh???t c???a WordPress, M??-??un s??? cung c???p cho b???n m???t trang web tr??ng tuy???t v???i d??? d??ng h??n.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <AppsIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>20+ M??-??UN BULILDER</Typography>
                        <Typography variant='caption'>T???o nhi???u m??-??un nh?? b???n mu???n. C?? nh??n h??a ch??ng v?? x??y d???ng v???i ch??ng c??c trang c???a b???n.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <NotStartedIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>????O T???O VIDEO WP</Typography>
                        <Typography variant='caption'>Th?????ng th???c b??? s??u t???p to??n di???n c??c video h?????ng d???n v??? WordPress 101 tr??n l??nh v???c ????o t???o th??nh vi??n c???a ch??ng t??i.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
      <Footer/>
    </AnimatedPage>
  )
}
export default AboutUs
