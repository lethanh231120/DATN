import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Card, CardTitle, CardBody, Button, UncontrolledCollapse, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, searchOrder } from '../../../../redux/orderSlice';
import { patch } from '../../../../api/BaseRequest';
import Paginate from '../paginate/Paginate';

const Order = () => {
  const [confirm, setConfirm] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState({
    id: '',
    name: '',
    paymentResult: ''
  })
  const [submitSearch, setSubmitSearch] = useState(false)
  let listOrder = []

  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.orders)

  useEffect(() => {
    if( submitSearch === false){
      dispatch(getOrders({ page: currentPage+1 }))
      setConfirm(false)
    }
  }, [dispatch, confirm, currentPage])

  if(orders.orders){
    listOrder = orders.orders
  }

  const handleConfirm = (id) => {
    patch(`orders/${id}`, { status: 'Đang giao' })
    setConfirm(true)
  }

  const handleChangeId = (e) => {
    setSearch({
      ...search,
      id: e.target.value
    })
  }

  const handleChangeUserName = (e) => {
    setSearch({
      ...search,
      name: e.target.value
    })
  }

  const handleChangePaymentResult = (e) => {
    setSearch({
      ...search,
      paymentResult: e.target.value
    })
  }

  const handleChangePage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }

  const handleSubmitSearch = () => {
    const info = {
      id: search.id ? search.id : null,
      name: search.name ? search.name : null,
      paymentResult: search.paymentResult ? search.paymentResult : null,
      page: currentPage+1,
    }
    dispatch(searchOrder(info))
    setSubmitSearch(true)
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <Row>
              <Col lg='10'>
                <i className="bi bi-card-text me-2"> </i>
                Dánh sách đơn hàng
              </Col>
              <Col lg='2'>
                <Button
                  color="primary"
                  id="toggler"
                  style={{
                    marginBottom: '1rem'
                  }}
                >
                  <i className="bi bi-funnel"></i>Lọc
                </Button>
              </Col>
              <UncontrolledCollapse toggler="#toggler">
                <Card className='border'>
                  <CardBody>
                    <Row>
                      <Col lg='11'>
                        <Row>
                          <Col lg='4'>
                            <Input
                              placeholder="Mã đơn hàng"
                              type="text"
                              onChange={handleChangeId}
                            />
                          </Col>
                          <Col lg='4'>
                            <Input
                              placeholder="Tên người nhận"
                              type="text"
                              onChange={handleChangeUserName}
                            />
                          </Col>
                          <Col lg='4'>
                            <Input type="select" onChange={handleChangePaymentResult}>
                              <option>---Chọn trạng thái---</option>
                              {/* <option value='Chờ xét duyệt'>Chờ xét duyệt</option> */}
                              <option value='Chưa thanh toán'>Chưa thanh toán</option>
                              <option value='Đã thanh toán'>Đã thanh toán</option>
                            </Input>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg='1'>
                        <Button color='primary' onClick={handleSubmitSearch}>Lọc</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            </Row>
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Người nhận</th>
                  <th>Địa chỉ</th>
                  <th>Tổng tiền</th>
                  <th>Hình thức thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listOrder.map((item, index) => (
                  <tr key={index}>
                    <th>{index+1}</th>
                    <td>{item.userName}</td>
                    <td>{item.shippingAddress}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.paymentResult}
                    </td>
                    <td>
                      <div className="button-group">
                        <Button
                          color={(item.status === 'Chờ xét duyệt') ? 'secondary'
                          : (item.status === 'Đang giao') ? 'primary'
                          : 'success' }
                          onClick={() => handleConfirm(item._id)}
                        >
                          <i className="bi bi-check-lg"></i>
                          {item.status}
                        </Button>
                        <Link to={`../${item._id}`}>
                          <Button color='info'><i className="bi bi-file-earmark-text"></i>Xem</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
          <Paginate
            handleChangePage={handleChangePage}
            currentPage={currentPage}
            pages={orders.pages}
          />
        </Card>
      </Col>
    </Row>
  )
}
export default Order
