import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from "react-final-form";
import { Card, Row, Col, CardTitle, CardBody, Button, FormGroup, Label, Input } from "reactstrap";
import { getBlogById, putBlogById } from '../../../../redux/blogSlice';
import { searchProduct } from '../../../../redux/productSlice';

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

const EditBlog = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blogs, status } = useSelector(state => state.blogs)
  const { products } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getBlogById(id))
  }, [])

  useEffect(() => {
    if(status === 'get blog success'){
      dispatch(searchProduct({ id: blogs.productId }))
    }
  }, [blogs])

  useEffect(() => {
    (status === 'blog updated') && (navigate('../../../admin/blog'))
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const onSubmit = (values) => {
    const data = {
      name: blogs.name,
      image: blogs.image,
      productId: blogs.productId,
      content: values.content,
      title: values.title
    }
    dispatch(putBlogById({ id, data }))
  }

  return (
    <Row>
    <Col>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
          Chỉnh sửa blog
        </CardTitle>
        <CardBody>
          <Form
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, values, submitting, validating }) => (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name">Tên sản phẩm</Label>
                  <Field name="title">
                    {({ input, meta }) => (
                      <Input  placeholder={products.products && (products.products)[0].name} readOnly/>
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
                          placeholder={blogs.title}
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
                          placeholder={blogs.content}
                          invalid={meta.error && meta.touched}
                        />
                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                </FormGroup>

                <div className="button-group">
                  <Button type='submit' className="btn" color="primary">
                    Cập nhật
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
export default EditBlog
