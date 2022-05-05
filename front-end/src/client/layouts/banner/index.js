import React, { useState, useEffect } from 'react'
import './banner.scss'
import { Link } from 'react-router-dom';

const slides = [
  {
    brand: 'IP Dome Hikvision',
    name: 'Camera an ninh',
    img: './images/banner1.jpg',
  },
  {
    brand: 'SONY',
    name: 'Máy ảnh',
    img: './images/banner2.jpg',
  },
  {
    brand: 'Havit TW 967',
    name: 'Tai nghe',
    img: './images/banner3.jpg',
  },
  {
    brand: 'oculus quest 2',
    name: 'Thiết bị thực tế ảo',
    img: './images/banner4.jpg',
  },
  {
    brand: 'APPLE',
    name: 'Đồng hồ',
    img: './images/banner5.jpg',
  }
];

export const Banner = () => {
  const IMAGE_PARTS = 4;
  const AUTOCHANGE_TIME = 3000;
  const [state, setState] = useState({
    activeSlide: 0,
    prevSlide: -1
  })
  let changeTO = null

  useEffect(() => {
    changeTO = setInterval(() => {
      runAutochangeTO()
    }, AUTOCHANGE_TIME)
    return () => clearInterval(changeTO)
  })

  const runAutochangeTO = () => {
    changeSlides(1)
  }

  const changeSlides = (change) => {
    clearTimeout(changeTO)
    const length = slides.length
    const prevSlide = state.activeSlide
    let activeSlide = prevSlide + change
    if (activeSlide < 0) activeSlide = length - 1
    if (activeSlide >= length) activeSlide = 0
    setState({ ...state, activeSlide, prevSlide })
  }

  return (
      <div className='slider s--ready'>
        <div className="slider__slides">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${state.activeSlide === index ? 's--active slider__slide' : ""} ${state.prevSlide === index ? "s--prev slider__slide" : ""}`}
              >
              <div className="slider__slide-content">
                <h3 className="slider__slide-subheading">{slide.name || slide.brand}</h3>
                <h2 className="slider__slide-heading">
                  {slide.brand.split('').map((l, index) => <span key={index}>{l}</span>)}
                </h2>
                <Link to='product-category'>
                  <p className="slider__slide-readmore">
                    read more
                  </p>
                </Link>
              </div>
              <div className="slider__slide-parts">
                {[...Array(IMAGE_PARTS).fill()].map((x, i) => (
                  <div className="slider__slide-part" key={i}>
                    <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }}>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="slider__control" onClick={() => changeSlides(-1)} />
        <div className="slider__control slider__control--right" onClick={() => changeSlides(1)} />
      </div>
  )
}
