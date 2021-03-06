import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from 'react-redux';
import { postUsers, searchUsers } from '../../../../redux/userSlice';

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
  if (!values.password) {
    errors.password = "Password is required";
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

const AddUser = () => {
  const [image, setImage] = useState('')
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(searchUsers())
  }, [dispatch])

  useEffect(() => {
    (status === 'user created') && (navigate(-1))
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
    dispatch(postUsers(formData))
  }

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Add User
          </CardTitle>
          <CardBody>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, values, submitting, validating }) => (
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="first_name">H??? ?????m</Label>
                    <Field name="first_name">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder='H??? ?????m'
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="last_name">T??n </Label>
                    <Field name="last_name">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder='T??n c???a b???n'
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">?????a ch??? email</Label>
                    <Field name="email">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder='?????a ch??? email'
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="phone">S??? ??i???n tho???i</Label>
                    <Field name="phone">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder='S??? ??i???n tho???i'
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="address">?????a ch???</Label>
                    <Field name="address">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="text"
                            placeholder='?????a ch???'
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="image">Anh ?????i di???n</Label>
                    <Input
                      name='image'
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Field name="password">
                      {({ input, meta }) => (
                        <div>
                          <Input
                            {...input}
                            type="password"
                            placeholder="M???t kh???u"
                            invalid={meta.error && meta.touched}
                          />
                          {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </FormGroup>

                  <FormGroup>
                    <Label for="userType">Lo???i t??i kho???n</Label>
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
                      Th??m
                    </Button>
                    <Button onClick={handleCancel} className="btn" color="danger">
                      H???y B???
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
export default AddUser
