import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row, Card, CardBody, CardTitle, Button } from "reactstrap";
import moment from 'moment';
import { getBlogById } from '../../../../redux/blogSlice';
import { searchProduct } from '../../../../redux/productSlice';
import { getUserById } from '../../../../redux/userSlice';

const DetailBlog = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { blogs, status } = useSelector(state => state.blogs)
  const { products } = useSelector(state => state.products)
  const { users } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getBlogById(id))
  }, [])

  useEffect(() => {
    if(status === 'get blog success'){
      dispatch(searchProduct({ id: blogs.productId }))
      dispatch(getUserById(blogs.user))
    }
  }, [blogs])

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div>
      <div>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Thông tin chi tiết blog
          </CardTitle>
          <CardBody className="">
            <Container>
              <Row>
                <Col lg='3'>ảnh sản phẩm</Col>
                <Col lg='9'>
                  <div className='list-image'>
                    <img src={blogs.image}/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg='3'>Tên sản phẩm</Col>
                <Col lg='9'>
                  <Link to={`../../product/${blogs.productId}`}>{blogs.name}</Link>
                </Col>
              </Row>
              <Row>
                <Col lg='3'>Tiêu đề</Col>
                <Col lg='9'>{blogs.title}</Col>
              </Row>
              <Row>
                <Col lg='3'>Nội dung</Col>
                <Col lg='9'>{blogs.content}</Col>
              </Row>
              <Row>
                <Col lg='3'>Ngày tạo</Col>
                <Col lg='9'>{moment(blogs.createdAt).format('DD/MM/YYYY')}</Col>
              </Row>
              <Row>
                <Col lg='3'>Người tạo</Col>
                <Col lg='9'>{users && (`${users.first_name} ${users.last_name}`)}</Col>
              </Row>
              <Row>
                <Col lg='3'>Bình luận</Col>
                <Col lg='9'>
                  {products.reviews && products.reviews.length}
                </Col>
              </Row>
              <Row>
                <div className="button-group d-flex justify-content-left">
                  <Link to={`../../edit-blog/${blogs._id}`}>
                    <Button type='submit' className="btn" color="primary">
                      Chỉnh sửa
                    </Button>
                  </Link>
                  <Button onClick={handleCancel} className="btn" color="danger">
                    Quay lại
                  </Button>
                </div>
              </Row>
            </Container>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
export default DetailBlog
