import React, { useEffect } from 'react'
import { Card, Row, Col, CardTitle, CardBody, Button } from "reactstrap";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '../../../../redux/productSlice';
import { getCategoryById } from '../../../../redux/categorySlice';
import './product.scss'

const DetailProduct = () => {
  const { id } = useParams()
  let Product
  console.log(id)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products } = useSelector(state => state.products)
  const { categories } = useSelector(state => state.categories)

  const handleCancel = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(searchProduct({ id: id }))
  }, [])

  if(products.products){
    Product = (products.products)[0]
  }

  console.log(categories)
  console.log(Product)
  useEffect(() => {
    dispatch(getCategoryById(Product && Product.categoryId))
  }, [Product && Product.categoryId])

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Thông tin chi tiết  Sản phẩm
          </CardTitle>
          <CardBody>
            <Row>
              <Col
                sm={{
                  offset: 1,
                  order: 1,
                  size: 10,
                }}
              >
                <Row>
                  <Col lg='3'>Tên sản phẩm</Col>
                  <Col lg='9'>{Product && Product.name}</Col>
                </Row>

                <Row>
                  <Col lg='3'>Dánh sách ảnh sản phẩm</Col>
                  <Col lg='9'>
                    <div className='d-flex align-items-center list-image mt-1'>
                      {(Product && Product.listImage) ? ([...Product.listImage]).map((item, index) =>
                        <img key={index} src={item}/>
                      ) : '' }
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col lg='3'>Danh mục</Col>
                  <Col lg='9'>{categories.name}</Col>
                </Row>

                <Row>
                  <Col lg='3'>Giá tiền</Col>
                  <Col lg='9'>{Product && Product.price} đ</Col>
                </Row>

                <Row>
                  <Col lg='3'>Chiết khấu</Col>
                  <Col lg='9'>{Product && Product.discount} %</Col>
                </Row>

                <Row>
                  <Col lg='3'>Đánh giá</Col>
                  <Col lg='9'>
                    {Product && Product.rating}<i className="bi bi-star-fill  star"></i>
                  </Col>
                </Row>

                <Row>
                  <Col lg='3'>Số lượng có</Col>
                  <Col lg='9'>{Product && Product.countInStock} Chiếc</Col>
                </Row>

                <Row>
                  <Col lg='3'>Cân nặng</Col>
                  <Col lg='9'>{Product && Product.weight} kg</Col>
                </Row>

                <Row>
                  <Col lg='3'>Miêu tả</Col>
                  <Col lg='9'>{Product && Product.description}</Col>
                </Row>

                <Row>
                  <Col lg='3'>Kích thước</Col>
                  <Col lg='9'>
                    {(Product && Product.dimensions) && (Product.dimensions.split(',')[0] + ' x ' + Product.dimensions.split(',')[1] + ' x ' + Product.dimensions.split(',')[2])} cm
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <div className="button-group d-flex justify-content-center">
                <Link to={`../../edit-product/${Product && Product._id}`}>
                  <Button type='submit' className="btn" color="primary">
                    Chỉnh sửa
                  </Button>
                </Link>
                <Button onClick={handleCancel} className="btn" color="danger">
                  Quay lại
                </Button>
              </div>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default DetailProduct
