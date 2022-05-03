import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Avatar, Typography, Box, Grid } from '@mui/material';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Item, styleTypography } from '../../components/assets/style'
import { getProducts } from "../../../redux/productSlice";
import "./styles.css";
import './latest.scss'

export default function Latest() {
  let listProduct = []

  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)

  useEffect(() =>  {
    dispatch(getProducts({ pageSize: 12 }))
  }, [dispatch])

  if(products.products){
    listProduct = products.products
  }

  return (
    <Box>
      <Typography variant='h4' sx={styleTypography}>Sản phẩm mới nhất</Typography>
      <Grid container sx={{ height: '80vh' }}>
        <Grid item xs={6} sx={{ height: '100%' }}>
          <Item sx={{ height: '100%', padding: '0px', position: 'relative' }} >
            <Avatar
              className='avatar'
              variant='square'
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src='./images/latest1.jpg'
            />
            <Box className='avatar-text-content'>
              <Box className='avatar-text-title'>LATEST CATEGORY</Box>
              <Box className='avatar-text-name'>Samsung Gearbox 360 Degree</Box>
              <Box className='avatar-text-number'>Available 365 items</Box>
              <Link to='product-category'>
                <Box className='avatar-text-button'>View All</Box>
              </Link>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6} sx={{ height: '100%' }}>
          <Swiper
            slidesPerView={1}
            loop={true}
            loopFillGroupWithBlank={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Grid item xs={12} sx={{ height: '100%' }}>
                <Grid container item xs={12} sx={{ height: '50%' }}>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[0] && listProduct[0].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[1] && listProduct[1].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                </Grid>
                <Grid container item xs={12} sx={{ height: '50%' }}>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[2] && listProduct[2].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[3] && listProduct[3].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid item xs={12} sx={{ height: '100%' }}>
                <Grid container item xs={12} sx={{ height: '50%' }}>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[4] && listProduct[4].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[5] && listProduct[5].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                </Grid>
                <Grid container item xs={12} sx={{ height: '50%' }}>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[6] && listProduct[6].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[7] && listProduct[7].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid item xs={12} sx={{ height: '100%' }}>
                <Grid container item xs={12} sx={{ height: '50%' }}>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[8] && listProduct[8].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[9] && listProduct[9].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                </Grid>
                <Grid container item xs={12} sx={{ height: '50%' }}>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          src={listProduct[10] && listProduct[10].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sx={{ height: '100%' }}>
                    <Link to='product-category'>
                      <Item sx={{ height: '100%', padding: '0px', position: 'relative' }}>
                        <Avatar
                          className='avatar'
                          variant='square'
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          // src='./images/latest13.jpg'
                          src={listProduct[11] && listProduct[11].listImage[0]}
                        />
                        <Box className='avatar-text'>Smart Watch</Box>
                      </Item>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </SwiperSlide>
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  );
}
