import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios'
import { post } from '../../../../api/BaseRequest';
import Paypal from './paypal';
import FormAddress from './FormAddress';
import TotalMoney from './TotalMoney';
import Bill from './Bill';

const TotalCart = ({ total, orderItems, setListProductId }) => {
  const [listProvince, setListProvince] = useState([])
  const [payment, setPayment] = useState('0')
  const [checkout, setCheckout] = useState(false)
  const [address, setAddress] = useState({
    province: '---- Tỉnh / Thành phố ---- ',
    district: '---- Quận / Huyện ----',
    commune: '---- Phường / Xã ----',
    apartmentNumber: 'Số nhà'
  })
  const [statusCreateOrder, setStatusCreateOrder] = useState(false)
  const [error, setError] = useState('')
  const SHIPPING_PRICE = 30000

  useEffect(() => {
    axios.get('https://provinces.open-api.vn/api/?depth=3')
    .then(res => setListProvince(res.data))
  }, [])

  //lấy thông tin của province theo id vừa đk chọn
  let province = listProvince.find(item => (item.code === address.province))
  // gán listDisttrict bằng danh sách districts của province được chọn
  let listDistrict = province && province.districts
  // Lấy thông tin của district vừa được chọn
  let district = (province !== undefined) && listDistrict.find(item => (item.code === address.district))
  // gán listCommune bằng danh sách wards của district vừa đk chọn
  let listCommune = district && district.wards
  // Lấy thông tin của commune theo id được chọn
  let commune = (province !== undefined && district !== undefined) && listCommune.find(item => (item.code === address.commune))

  const handleChangeProvince = (e) => {
    setAddress({
      ...address,
      province: e.target.value
    })
  }

  const handleChangeDistrict = (e) => {
    setAddress({
      ...address,
      district: e.target.value
    })
  }

  const handleChangeCommune = (e) => {
    setAddress({
      ...address,
      commune: e.target.value
    })
  }

  const handleChangeApartmentNumber = (e) => {
    setAddress({
      ...address,
      apartmentNumber: e.target.value
    })
  }

  const handleSubmitCreateOrder = () => {
    if(total === 0){
      setError('Bạn chưa chọn sản phẩm nào')
    }else{
      setError('')
      setStatusCreateOrder(true)
    }
  }

  const handleCancel = () => {
    setStatusCreateOrder(!statusCreateOrder)
  }

  const handleChangePayment = (e) => {
    setPayment(e.target.value)
  }

  const shippingAddress = `${address.apartmentNumber} / ${commune && commune.name} / ${district && district.name} / ${province && province.name}`

  const info = {
    orderItems,
    shippingAddress,
    taxPrice: 0,
    shippingPrice: SHIPPING_PRICE,
    totalPrice: total,
    isPaid: false,
    paymentResult: 'Chưa thanh toán',
    paymentMethod: payment === '0' ? 'Trực tiếp' : 'Chuyển khoản'
  }

  const handleCreateOrder = async() => {
    payment === '0' && await post('orders', info)
    payment === '0' ? setStatusCreateOrder(!statusCreateOrder) : setCheckout(true)
    setListProductId([])
  }

  return (
    <Box sx={{ textAlign: 'right', width: '60%',  marginLeft: 'auto' }}>
      {(statusCreateOrder === true && checkout === false)
      ? <Bill
        orderItems={orderItems}
        address={address}
        payment={payment}
        total={total}
        handleCreateOrder={handleCreateOrder}
        handleCancel={handleCancel}
        commune={commune}
        district={district}
        province={province}
        shipping={SHIPPING_PRICE}
      />
      : (statusCreateOrder === true && checkout === true) ?
        <Paypal
          total={total}
          info={info}
          setCheckout={setCheckout}
          setListProductId={setListProductId}
          setStatusCreateOrder={setStatusCreateOrder}
        />
      : <> <TotalMoney total={total} error={error} shipping={SHIPPING_PRICE}/>
        <FormAddress
          handleChangeProvince={handleChangeProvince}
          address={address}
          listProvince={listProvince}
          listDistrict={listDistrict}
          listCommune={listCommune}
          handleChangeDistrict={handleChangeDistrict}
          handleChangeCommune={handleChangeCommune}
          handleChangeApartmentNumber={handleChangeApartmentNumber}
          handleChangePayment={handleChangePayment}
          payment={payment}
          handleSubmitCreateOrder={handleSubmitCreateOrder}
        />
      </>}
    </Box>
  )
}
export default TotalCart
