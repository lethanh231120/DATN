import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Avatar } from "@mui/material";

const styleAvatar = {
  width: '100%',
  height: '80vh',
  objectFit: 'cover'
}
const styleListAvatar = {
  width: '100%',
  height: '90px',
  objectFit: 'cover'
}

const SlideProduct = ({ listImage }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          cursor: 'grab'
        }}
        loop={true}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {listImage && listImage.map((item, index) => (
          <SwiperSlide key={index}>
            <Avatar sx={styleAvatar} variant='square' src={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        style={{ cursor: 'grab', marginTop: '20px' }}
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={20}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
         {listImage && listImage.map((item, index) => (
          <SwiperSlide key={index}>
            <Avatar sx={styleListAvatar} variant='square' src={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
export default SlideProduct
