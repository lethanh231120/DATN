import React, { useEffect } from 'react'
import { Row, Col, Table, Card, CardTitle, CardBody, Button, Label } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import { getOrderById } from '../../../../redux/orderSlice';

const OrderDetail = () => {
  const { id } = useParams()
  let subtotal2 = [];

  const dispatch = useDispatch()
  const { orders } = useSelector(state => state.orders)

  useEffect(() => {
    dispatch(getOrderById(id))
  }, [])

  // Tính tiền
  const abc = () => {
    if(orders && orders.orderItems){
      (orders.orderItems).map((product) => subtotal2.push(product.price))
    }
  }
  abc()

  const total = subtotal2.reduce(((total, num) => {
    return total + Math.round(num);
  }), 0);

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <Row>
              <Col lg='10'>
                <i className="bi bi-card-text me-2"> </i>
                Chi tiết đơn hàng
              </Col>
              <Col lg='2'>
                <Button color='primary'>
                  <i className="bi bi-arrow-down-circle-fill"></i>Xuất
                </Button>
              </Col>
            </Row>
          </CardTitle>
          <CardBody className="">
            <Row className="mt-3">
              <Col sm={{ offset: 1, order: 1, size: 4 }}>
                <Row>
                  <Col xs="5">
                    <Label for="exampleEmail">Mã đơn hàng:</Label>
                  </Col>
                  <Col xs="7">
                    <Label for="exampleEmail">{orders && orders._id}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="5">
                    <Label for="exampleEmail">Ngày Đặt hàng:</Label>
                  </Col>
                  <Col xs="7">
                    <Label for="exampleEmail">{moment(orders && orders.createdAt).format('DD/MM/YYYY')}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="5">
                    <Label for="exampleEmail">Trạng thái:</Label>
                  </Col>
                  <Col xs="7">
                    <Label for="exampleEmail">{orders.status}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="5">
                    <Label for="exampleEmail">Địa chỉ nhận:</Label>
                  </Col>
                  <Col xs="7">
                    <Label for="exampleEmail">{orders && orders.shippingAddress}</Label>
                  </Col>
                </Row>
              </Col>
              <Col sm={{ offset: 1, order: 1, size: 5 }}>
                <Row>
                  <Col xs="6">
                    <Label for="exampleEmail">Mã khách hàng:</Label>
                  </Col>
                  <Col xs="6">
                    <Label for="exampleEmail">{(orders && orders.user) && orders.user._id}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Label for="exampleEmail">Tên Khách hàng:</Label>
                  </Col>
                  <Col xs="6">
                    <Label for="exampleEmail">{(orders && orders.user) && (orders.user.first_name + ' ' + orders.user.last_name)}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Label for="exampleEmail">Email:</Label>
                  </Col>
                  <Col xs="6">
                    <Label for="exampleEmail">{(orders && orders.user) && orders.user.email}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <Label for="exampleEmail">Số điện thoại:</Label>
                  </Col>
                  <Col xs="6">
                    <Label for="exampleEmail">{(orders && orders.user) && orders.user.phone}</Label>
                  </Col>
                </Row>
              </Col>
            </Row>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-card-text me-2"> </i>
              Danh sách sản phẩm
            </CardTitle>
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Anh</th>
                  <th>Gía tiền</th>
                  <th>Hình thức thanh toán</th>
                  <th>Thuế VAT</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {(orders && orders.orderItems) ? (orders.orderItems).map((item) => (
                  <tr key={item._id}>
                    <th scope="row">1</th>
                    <td>{item.name}</td>
                    <td>
                      <img
                        src={item.image}
                        alt="image"
                        width="100px"
                        height="100px"
                      />
                    </td>
                    <td>{item.price}</td>
                    <td>{orders.paymentMethod}</td>
                    <td>{orders.taxPrice}</td>
                    <td>{item.quantity}</td>
                  </tr>
                )) : <tr><td colSpan='5'>Không có dữ liệu</td></tr>}
              </tbody>
            </Table>
            <Row>
              <Col lg='2'>Phí ship:</Col>
              <Col lg='10'>{orders && orders.shippingPrice} đ</Col>
            </Row>
            <Row>
              <Col lg='2'>Tổng tiền:</Col>
              <Col lg='10'>{orders && (orders.shippingPrice + total)} đ</Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default OrderDetail
