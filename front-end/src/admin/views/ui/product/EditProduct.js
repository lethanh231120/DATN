import React, { useState, useEffect } from 'react'
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct, putProductById } from '../../../../redux/productSlice';
import { getAllCategories } from '../../../../redux/categorySlice';
import './product.scss'

const validateForm = (values)  => {
  const errors = {};
  if (!values.price) {
    errors.price = "Vui lòng nhập giá bán của sản phẩm";
  }else if (!(values.price).match('[0-9]')) {
    errors.price = "Vui lòng nhập giá bán là số";
  }
  if (!values.discount) {
    errors.discount = "Vui lòng nhập chiết khấu của sản phẩm";
  }else if (!(values.discount).match('[0-9]')) {
    errors.discount = "Vui lòng nhập chiết khấu là số";
  }
  if (!values.countInStock) {
    errors.countInStock = "Vui lòng nhập số lượng có của sản phẩm";
  }else if (!(values.countInStock).match('[0-9]')) {
    errors.countInStock = "Vui lòng nhập số lượng trong kho là số";
  }
  return errors;
}

const EditProduct = () => {
  const [categoryId, setCategoryId] = useState()
  const { id } = useParams()
  const [images, setImages] = useState()
  const [newDimension, setNewDimension] = useState({
    height: '',
    length: '',
    width: ''
  })
  let listCategory = []
  let Product = []

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, status } = useSelector(state => state.products)
  const { categories } = useSelector(state => state.categories)

  if(categories.categories){
    listCategory = categories.categories
  }
  if(products.products){
    Product = (products.products)[0]
  }

  const dimensions = Product.dimensions ? (Product.dimensions).split(',') : []

  useEffect(() => {
    dispatch(searchProduct({ id: id }))
  }, [])

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    (status === 'product updated') && (navigate('/admin/list-product'))
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const onSubmit = (values) => {
    const formData = new FormData()
    formData.append('name', (values.name) ? (values.name) : products.name)
    formData.append('categoryId', categoryId ? categoryId : products.categoryId)
    for (let i = 0; i < images.length; i++) {
      formData.append('listImage', images[i])
    }
    formData.append('dimensions', newDimension ? `${parseInt(newDimension.length)},${parseInt(newDimension.width)},${parseInt(newDimension.height)}` : products.dimensions)
    formData.append('price', (values.price) ? parseInt(values.price) : products.price)
    formData.append('weight', (values.weight) ? parseInt(values.weight) : products.weight)
    formData.append('countInStock', (values.countInStock) ? parseInt(values.countInStock) : products.countInStock)
    formData.append('discount', (values.discount) ? parseInt(values.discount) : products.discount)
    dispatch(putProductById({ id, formData }))
  }

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Chỉnh sửa thông tin  Sản phẩm
          </CardTitle>
          <CardBody>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, values, submitting, validating }) => (
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="name">Tên sản phẩm</Label>
                    <Field name="name">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder={Product.name}
                          />
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="listImage">Danh sách hình ảnh</Label>
                    <Field name="listImage">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            name='listImage'
                            type="file"
                            multiple
                            onChange={(e) => setImages(e.target.files)}
                          />
                        </div>
                      )}
                    </Field>
                    <div className='d-flex align-items-center list-image mt-1'>
                      {((Product.listImage) && !images) ? ([...Product.listImage]).map((item, index) =>
                        <img key={index} src={item}/>
                      ) :
                        (((Product.listImage) && images) || ((Product.listImage === undefined) && images)) ?
                          ([...images].map((item, index) =>
                            <img key={index} src={URL.createObjectURL(item)}/>
                          ))
                        : '' }
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label for="categoryId">Danh mục</Label>
                    <Field name="categoryId">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            className="mb-3"
                            type="select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                          >
                            {listCategory.map((category, index) =>
                              <option key={index} value={category._id}>{category.name}</option>
                            )}
                          </Input>
                        </div>
                      )}
                    </Field>

                  </FormGroup>

                  <FormGroup>
                    <Label for="description">Mô tả sản phẩm</Label>
                    <Field name="description">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="textarea"
                            placeholder={Product.description}
                          />
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="weight">Cân nặng</Label>
                    <Field name="weight">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder={Product.weight}
                          />
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="dimensions">Kích thước</Label>
                    <Row>
                      <Col lg='11'>
                        <Row>
                          <Col lg='4'>
                            <Field name="length">
                              {({ input, meta }) => (
                                <div>
                                  <Input
                                    {...input}
                                    type="text"
                                    placeholder={dimensions[0]}
                                    value={newDimension.length}
                                    onChange={e => setNewDimension({ ...newDimension, length: e.target.value })}
                                  />
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col lg='4'>
                            <Field name="width">
                              {({ input, meta }) => (
                                <div>
                                  <Input
                                    {...input}
                                    type="text"
                                    placeholder={dimensions[1]}
                                    value={newDimension.width}
                                    onChange={e => setNewDimension({ ...newDimension, width: e.target.value })}
                                  />
                                </div>
                              )}
                            </Field>
                          </Col>
                          <Col lg='4'>
                            <Field name="height">
                              {({ input, meta }) => (
                                <div>
                                  <Input
                                    {...input}
                                    type="text"
                                    placeholder={dimensions[2]}
                                    value={newDimension.height}
                                    onChange={e => setNewDimension({ ...newDimension, height: e.target.value })}
                                  />
                                </div>
                              )}
                            </Field>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg='1'>cm</Col>
                    </Row>
                  </FormGroup>

                  <FormGroup>
                    <Label for="price">Gía Bán</Label>
                    <Field name="price">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="number"
                            placeholder={Product.price}
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="discount">Chiết khấu</Label>
                    <Field name="discount">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="number"
                            placeholder={Product.discount}
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="countInStock">Số lượng có</Label>
                    <Field name="countInStock">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="number"
                            placeholder={Product.countInStock}
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <div className="button-group">
                    <Button type='submit' className="btn" color="primary">
                      Lưu
                    </Button>
                    <Button onClick={handleCancel} className="btn" color="danger">
                      Hủy Bỏ
                    </Button>
                  </div>
                </form>
              )}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default EditProduct
