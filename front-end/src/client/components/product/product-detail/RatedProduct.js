import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Thumbs, Navigation } from "swiper";
import { Box, Typography, Grid } from '@mui/material';
import ProductDefault from "../product-default";
import { Item } from '../../../components/assets/style'
import { getTopRatingProducts } from "../../../../redux/productSlice";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function RatedProduct() {
  let listProduct = []

  const dispatch = useDispatch()
  const { productsRating } = useSelector(state => state.products)
  const { isAuthenticated } = useSelector(state => state.userInfo)

  useEffect(() => {
    dispatch(getTopRatingProducts())
  }, [])

  if(productsRating.data){
    listProduct = productsRating.data
  }

  return (
    <Box className='latest'>
      <Typography variant='h4' sx={{ margin: '50px 0 30px' }}>Sản phẩm thịnh hành</Typography>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        loop={true}
      >
        <Grid container>
          <Grid item xs={12}>
            <Grid container item spacing={5}>
              {listProduct && listProduct.map((item , index) => (
                <SwiperSlide key={index}>
                  <Grid item xs={2.4}>
                    <Item>
                      <ProductDefault
                        isAuthenticated={isAuthenticated}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        discount={item.discount}
                        rating={item.rating}
                        image={item.listImage}
                      />
                    </Item>
                  </Grid>
                </SwiperSlide>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Swiper>
    </Box>
  );
}
