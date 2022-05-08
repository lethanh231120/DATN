import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, CardTitle, CardBody, Button, Input, Modal, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";
import { Form, Field } from "react-final-form";
import { getProfile } from '../../../../redux/Profile';
import './profile.scss'
import { put } from '../../../../api/BaseRequest';

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

const EditProfile = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const { profile, status } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  if(status && status === 'profile updated'){
    navigate(-1)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const onSubmit = async(values) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    }
    try{
      const isAdmin = (values.userType === 'admin' ? true : false)
      const formData = new FormData()
      Object.keys(values).forEach(key => formData.append(`${key}`, values[key]))
      formData.append('image', image)
      formData.set('userType', isAdmin)
      await put('user/profile', formData, config)
      setError('Cập nhật thông tin thành công')
      setOpen(true)
    }catch(error){
      error?.response?.data && setError(error.response.data.message)
      setOpen(true)
    }
  }

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Chỉnh sửa thông tin user: {profile.first_name} {profile.last_name}
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
                            placeholder={profile.first_name}
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
                            placeholder={profile.last_name}
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
                            placeholder={profile.email}
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
                            placeholder={profile.phone}
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
                            placeholder={profile.address}
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
          <div>
            <Modal isOpen={open}>
              <ModalBody>{error}</ModalBody>
              <ModalFooter>
                <Button onClick={() => navigate('/admin/my-profile')} color='primary'>
                  Đồng ý
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </Card>
      </Col>
    </Row>
  )
}
export default EditProfile
