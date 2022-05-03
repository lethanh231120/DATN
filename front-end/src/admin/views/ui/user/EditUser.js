import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
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
import { getUserById, putUserById } from '../../../../redux/userSlice'

const validateForm = (values)  => {
  const errors = {};
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  if (!values.first_name) {
    errors.first_name = "First name is required";
  }
  if (!values.last_name) {
    errors.last_name = "Last name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(values.email)) {
    errors.email = "Please enter email adress";
  }
  if (!values.phone) {
    errors.phone = "Password is required";
  }else if (!(values.phone).match('[0-9]{10}')) {
    errors.phone = "Please provide valid phone number";
  }
  if (!values.address) {
    errors.address = "Address is required";
  }
  return errors;
}

const EditUser = () => {
  const [image, setImage] = useState('')
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, users } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUserById(id))
  }, [])

  useEffect(() => {
    (status === 'user updated') && (navigate('/admin/user'))
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const onSubmit = (values) => {
    const admin = (values.userType === 'admin' ? true : false)
    const formData = new FormData()
    Object.keys(values).forEach(key => formData.append(`${key}`, values[key]))
    formData.append('image', image)
    formData.set('isAdmin', admin)
    dispatch(putUserById({ id, formData }))
    // status === 'update fail' && setOpen(true)
  }

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Chỉnh sửa thông tin user: {users.first_name}{users.last_name}
          </CardTitle>
          <CardBody>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, values, submitting, validating }) => (
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="first_name">Họ đệm</Label>
                    <Field name="first_name">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder={users.first_name}
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="last_name">Tên </Label>
                    <Field name="last_name">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder={users.last_name}
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Địa chỉ email</Label>
                    <Field name="email">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder={users.email}
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="phone">Số điện thoại</Label>
                    <Field name="phone">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder={users.phone}
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="address">Địa chỉ</Label>
                    <Field name="address">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder={users.address}
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="image">Anh đại diện</Label>
                    <Input
                      name='image'
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="userType">Loại tài khoản</Label>
                    <Field name="userType">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="select"
                          >
                            <option value='user'>user</option>
                            <option value='admin'>admin</option>
                          </Input>
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
export default EditUser
