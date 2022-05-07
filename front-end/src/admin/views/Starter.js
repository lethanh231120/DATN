import React, { useState, useEffect } from 'react'
import { Col, Row } from "reactstrap";
import {
  Card,
  CardBody,
  CardTitle,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import './index.css'
import { get } from '../../api/BaseRequest'
import { getAllCategories } from '../../redux/categorySlice';
import { useDispatch, useSelector } from 'react-redux';

const Starter = () => {
  const [users, setUsers] = useState()
  const [products, setProducts] = useState()
  const [orders, setOrders] = useState()
  let listOrder = []

  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.categories)

  const [params, setParams] = useState({
    perMonth: '1'
  })

  useEffect(async() => {
    const dataUsers = await get('users/statistical', params)
    const dataProducts = await get('products/statistical', params)
    const dataOrders = await get('orders/statistical', params)
    setUsers(dataUsers)
    setProducts(dataProducts)
    setOrders(dataOrders)
  }, [params])

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  const onChangeSelection = (e) => {
    setParams({
      ...params,
      perMonth: e.target.value
    });
  }
  listOrder = ( orders && orders.orders)

  const total = (listOrder !== undefined) ? listOrder.reduce(myFunc, 0) : 0
  function myFunc(total, num) {
    return(total + num.totalPrice)
  }

  return (
    <div>
      <div className='input-select'>
        <Input type={"select"} value={params.perMonth} onChange={onChangeSelection}>
          <option value={1}>1 Tháng</option>
          <option value={3}>3 Tháng</option>
          <option value={6}>6 Tháng</option>
        </Input>
      </div>
      <Row>
        <Col sm="6" lg="6" xl="3">
          <Link to='/admin/list-product'>
            <Card className='card card-box'>
              <div className='image'>
                <i className="bi bi-watch"></i>
              </div>
              <CardBody className="p-4 text-center">
                <CardTitle tag="h5">{products && products.total_Product} sản phẩm</CardTitle>
              </CardBody>
            </Card>
          </Link>
        </Col>
        <Col sm="6" lg="6" xl="3">
          <Link to='/admin/order'>
            <Card className='card card-box'>
              <div className='image'>
                <i className="bi bi-cart-check-fill"></i>
              </div>
              <CardBody className="p-4 text-center">
                <CardTitle tag="h5">{orders && orders.total_Order} đơn hàng</CardTitle>
                <CardTitle tag="h5">
                  <span>Doanh thu: </span>
                  <span>{total} đ</span>
                </CardTitle>
              </CardBody>
            </Card>
          </Link>
        </Col>
        <Col sm="6" lg="6" xl="3">
          <Link to='/admin/user'>
            <Card className='card card-box'>
              <div className='image'>
                <i className="bi bi-people-fill"></i>
              </div>
              <CardBody className="p-4 text-center">
                <CardTitle tag="h5">{users && users.total_User} Tài khoản mới</CardTitle>
              </CardBody>
            </Card>
          </Link>
        </Col>
        <Col sm="6" lg="6" xl="3">
          <Link to='/admin/category'>
            <Card className='card card-box'>
              <div className='image'>
                <i className="bi bi-card-list"></i>
              </div>
              <CardBody className="p-4 text-center">
                <CardTitle tag="h5">{categories.categories && categories.categories.length} Danh mục</CardTitle>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
