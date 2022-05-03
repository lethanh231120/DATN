import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid } from '@mui/material';
import AnimatedPage from '../../animation-page/AnimatedPage'
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../latest/styles.css";
import { Autoplay, FreeMode, Thumbs, Navigation } from "swiper";
import ProductDefault from '../../components/product/product-default';
import Footer from '../../layouts/footer';
import Main from '../../components/main';
import { getAllCarts, deleteCart } from '../../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getTopRatingProducts } from '../../../redux/productSlice';
import ListCart from './list-cart/ListCart';
import TotalCart from './total-cart/TotalCart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  textAlign: "left",
  boxShadow: 'none'
}));

export default function Cart() {
  const [message, setMessage] = useState('')
  const [orderItems, setOrderItems] = useState([])
  const [listProductId, setListProductId] = useState([])
  let listProduct = []
  let listProductRating = []
  let subtotal2 = [];

  const dispatch = useDispatch()
  const { carts, status } = useSelector(state => state.carts)
  const { productsRating } = useSelector(state => state.products)
  const { isAuthenticated } = useSelector(state => state.userInfo)

  useEffect(() => {
    (isAuthenticated && dispatch(getAllCarts()))
  }, [status === 'cart deleted'])

  useEffect(() => {
    dispatch(getTopRatingProducts())
    setOrderItems([])
  }, [])

  if(carts.products){
    listProduct = carts.products
  }
  if(productsRating.data){
    listProductRating = productsRating.data
  }

  const subtotal = (price, discount, quantity) => {
    return (parseInt(price) - Math.floor((parseInt(discount)*(parseInt(price))) / 100)) * quantity
  }

  // tính tiền. Nếu nếu chưa chọn sản phẩm nào để mua thì tính tổng tiền theo danh sách cart trả về (listProduct)
  // nếu đã chọn sản phẩm để mua thì tính theo danh sách sản phẩm vừa chọn (orderItems)
  (orderItems !== [] ?
    orderItems.map((product) => subtotal2.push(product.price))
    : listProduct.map((product) => (
    subtotal2.push(
      (product.price -
      Math.floor(((product.discount)*(product.price)) / 100))
      * product.quantity)
  )))

  let total = subtotal2.reduce(((total, num) => {
    return total + Math.round(num);
  }), 0);

  const handleDeleteCart = (id) => {
    dispatch(deleteCart(id))
  }

  const isActive = (id) => {
    return (listProductId && listProductId.some(item => item === id))
  }

  // const isProductInOrder = (product, newProduct) => {
  //   // kiểm tra nếu sp đã có trong đơn hàng thì không thêm nữa
  //   (isActive(product._id) === true)
  //     ? setMessage('Sản phẩm đã có trong đơn hàng')
  //     : (
  //       setOrderItems((prev) => {
  //         setMessage('')
  //         return [...prev, newProduct]
  //       }),
  //       setListProductId((prev) => {
  //         setMessage('')
  //         return [...prev, product._id]
  //       })
  //     )
  // }
  const handleAddOrder = (product) => {
    if(isActive(product._id) === true){
      setMessage('Sản phẩm đã có trong đơn hàng')
    }else{
      const newProduct = {
        name: product.name,
        image: product.image,
        // thêm giá tiền bằng giá tiền đã trừ đi chiết khấu của sp
        price: subtotal(product.price, product.discount, product.quantity),
        quantity: product.quantity,
        productId: product.productId
      };
      setOrderItems((prev) => ([...prev, newProduct]))
      setListProductId((prev) => ([...prev, product._id]))
      setMessage('')
    }
    // (isActive(product._id) === true)
      // ? setMessage('Sản phẩm đã có trong đơn hàng')
      // : (
      //   setOrderItems((prev) => {
      //     setMessage('')
      //     return [...prev, newProduct]
      //   }),
      //   setListProductId((prev) => {
      //     setMessage('')
      //     return [...prev, product._id]
      //   })
      // )
    // isProductInOrder(product, newProduct)
  }

  return (
    <AnimatedPage>
      <Main/>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <ListCart
            handleDeleteCart={handleDeleteCart}
            listProduct={listProduct}
            message={message}
            isActive={isActive}
            handleAddOrder={handleAddOrder}
          />
          <TotalCart total={total} orderItems={orderItems} setListProductId={setListProductId}/>
          <Box sx={{ margin: '30px 0 50px 0' }}>
            <Typography variant='h5' sx={{ margin: '40px 0' }}>Sản phẩm liên quan</Typography>
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
                {listProductRating && listProductRating.map((product, index) => (
                  <SwiperSlide key={index}>
                    <Grid item xs={12}>
                      <Item>
                        <ProductDefault
                          id={product._id}
                          name={product.name}
                          price={product.price}
                          rating={product.rating}
                          image={product.listImage}
                          discount={product.discount}
                        />
                      </Item>
                    </Grid>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Box>
        </Container>
      </Container>
      <Footer/>
    </AnimatedPage>
  );
}
