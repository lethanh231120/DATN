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
      <Main/>
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
          <Typography variant='h5' align='center'>Thành Viên Nhóm Của Chúng Tôi</Typography>
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
            <Typography variant='h5' sx={{ padding: '20px' }}>Lịch Sử Megnor</Typography>
            <Grid container spacing={1}>
              <Grid container item spacing={3}>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <PublicIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>DỄ SỬ DỤNG</Typography>
                        <Typography variant='caption'>Chúng tôi đã suy nghĩ rất nhiều trong việc cung cấp cho bạn trải nghiệm tốt nhất có thể để giúp công việc của bạn trở nên dễ dàng hơn.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <ChatBubbleIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>HỖ TRỢ XUẤT SẮC</Typography>
                        <Typography variant='caption'>Các mô-đun được tài liệu hóa đầy đủ với các hướng dẫn từng bước. truy cập diễn đàn hỗ trợ cao cấp.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <FavoriteBorderIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>ĐƠN GIẢN LÀ ĐẸP</Typography>
                        <Typography variant='caption'>Các chủ đề của chúng tôi không chỉ được mã hóa độc đáo, chúng được xây dựng để cho khách truy cập của bạn thấy bạn quan tâm đến vẻ đẹp và thiết kế như thế nào.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <ViewInArIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>ĐƯỢC CHẾ TẠO CẨN THẬN</Typography>
                        <Typography variant='caption'>Được mã hóa với các phương pháp hay nhất của WordPress, Mô-đun sẽ cung cấp cho bạn một trang web trông tuyệt vời dễ dàng hơn.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <AppsIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>20+ MÔ-ĐUN BULILDER</Typography>
                        <Typography variant='caption'>Tạo nhiều mô-đun như bạn muốn. Cá nhân hóa chúng và xây dựng với chúng các trang của bạn.</Typography>
                      </Box>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ textAlign: 'left' }}>
                    <Box sx={{ display: 'flex' }}>
                      <NotStartedIcon sx={styleIcon}/>
                      <Box>
                        <Typography sx={styleTypography} variant='subtitle2'>ĐÀO TẠO VIDEO WP</Typography>
                        <Typography variant='caption'>Thưởng thức bộ sưu tập toàn diện các video hướng dẫn về WordPress 101 trên lĩnh vực đào tạo thành viên của chúng tôi.</Typography>
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
