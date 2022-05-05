import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from "react-final-form";
import { Card, Row, Col, CardTitle, CardBody, Button, FormGroup, Label, Input } from "reactstrap";
import { getAllProducts, searchProduct } from '../../../../redux/productSlice';
import { postBlog } from '../../../../redux/blogSlice';

const validateForm = (values)  => {
  const errors = {};

  if (!values.content) {
    errors.content = "Vui lòng nhập nội dung blog";
  }
  if (!values.title) {
    errors.title = "Bạn chưa nhập tiêu đề blog";
  }
  return errors;
}

const CreateBlog = () => {
  const [productId, setProductId] = useState()
  let listProduct = []
  let Product

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)
  const { status } = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    (status === 'blog created') && (navigate(-1))
  })

  if(products.products && (products.products).length > 1){
    listProduct = products.products
  }
  else if(products.products && (products.products).length === 1){
    Product = (products.products)[0]
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleChangeProduct = (e) => {
    setProductId(e.target.value)
    dispatch(searchProduct({ id: e.target.value }))
  }

  const onSubmit = (values) => {
    const data = {
      name: Product.name,
      image: Product.listImage[0],
      productId: productId,
      content: values.content,
      title: values.title
    }
    dispatch(postBlog(data))
  }

  return (
    <Row>
    <Col>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
          Thêm mới blog
        </CardTitle>
        <CardBody>
          <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, values, submitting, validating }) => (
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="productId">Chọn sản phẩm</Label>
                    <Field name="productId">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            type="select"
                            value={productId}
                            onChange={(e) => handleChangeProduct(e)}
                          >
                            {Product
                              ? <option key={Product.name} value={Product.name}>{Product.name}</option>
                              : listProduct.map((product, index) =>
                                <option key={index} value={product._id}>{product.name}</option>
                              )}
                          </Input>
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="title">Tiêu đề</Label>
                    <Field name="title">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder='Tiêu đề'
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="content">Nội dung</Label>
                    <Field name="content">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="textarea"
                            placeholder='Nội dung'
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
export default CreateBlog
