import React, { useState, useEffect } from 'react'
import { Card, Row, Col, CardTitle, CardBody, Button, FormGroup, Label, Input } from "reactstrap";
import { Form, Field } from "react-final-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../../redux/categorySlice';
import { postProduct } from '../../../../redux/productSlice';

const validateForm = (values)  => {
  const errors = {};
  if (!values.name) {
    errors.name = "Vui lòng nhập tên sản phẩm";
  }
  if (!values.description) {
    errors.description = "Bạn chưa nhập mô tả sản phẩm";
  }
  if (!values.weight) {
    errors.weight = "Vui lòng nhập cân nặng của sản phẩm";
  }
  if (!values.price) {
    errors.price = "Gía bán chưa được nhập";
  }else if (!(values.price).match('[0-9]')) {
    errors.price = "Vui lòng nhập giá bán là số";
  }
  if (!values.discount) {
    errors.discount = "Chiết khấu chưa được nhập";
  }else if (!(values.discount).match('[0-9]')) {
    errors.discount = "Vui lòng nhập chiết khấu là số";
  }
  if (!values.countInStock) {
    errors.countInStock = "Số lượng trong kho chưa được nhập";
  }else if (!(values.countInStock).match('[0-9]')) {
    errors.countInStock = "Vui lòng nhập số lượng trong kho là số";
  }
  return errors;
}

const CreateProduct = () => {
  const [images, setImages] = useState()
  const [categoryId, setCategoryId] = useState()
  const [dimension, setDimension] = useState({
    height: '',
    length: '',
    width: ''
  })
  let listCategory = []

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.products)
  const { categories } = useSelector(state => state.categories)

  if(categories.categories){
    listCategory = categories.categories
  }

  useEffect(() => {
    (status === 'product created') && (navigate(-1))
  })

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  const handleCancel = () => {
    navigate(-1)
  }

  const onSubmit = (values) => {
    const formData = new FormData()
    Object.keys(values).forEach(key => formData.append(`${key}`, values[key]))
    formData.append('categoryId', categoryId)
    for (let i = 0; i < images.length; i++) {
      formData.append('listImage', images[i])
    }
    formData.set('dimensions', `${parseInt(dimension.length)},${parseInt(dimension.width)},${parseInt(dimension.height)}`)
    formData.set('price', parseInt(values.price))
    formData.set('countInStock', parseInt(values.countInStock))
    formData.set('discount', parseInt(values.discount))

    dispatch(postProduct(formData))
  }

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Thêm mới Sản phẩm
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
                            placeholder='Tên sản phẩm'
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
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
                      {images ? ([...images].map((item, index) =>
                        <img key={index} src={URL.createObjectURL(item)}/>
                      )) : ''}
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
                            {(listCategory.length !== 0) && listCategory.map((category, index) =>
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
                            placeholder='Mô tả sản phẩm'
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
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
                            placeholder='Cân nặng'
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
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
                                    type="number"
                                    placeholder='Chiều dài'
                                    value={dimension.length}
                                    onChange={e => setDimension({ ...dimension, length: e.target.value })}
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
                                    type="number"
                                    placeholder='Chiều rộng'
                                    value={dimension.width}
                                    onChange={e => setDimension({ ...dimension, width: e.target.value })}
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
                                    type="number"
                                    placeholder='Chiều cao'
                                    value={dimension.height}
                                    onChange={e => setDimension({ ...dimension, height: e.target.value })}
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
                            type="text"
                            placeholder='Gía bán'
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
                            placeholder="Chiết khấu"
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
                            placeholder="Số lượng có"
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <div className="button-group">
                    <Button type='submit' className="btn" color="primary">
                      Thêm
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
export default CreateProduct
