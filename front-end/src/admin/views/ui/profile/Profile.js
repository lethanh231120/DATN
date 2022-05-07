import React, { useEffect } from 'react'
import { Container, Col, Row, Card, CardBody, CardTitle, Label, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../../../redux/Profile';

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(getProfile())
  }, [])

  const handleCancel = () => {
    navigate('/admin')
  }
  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Thông tin tài khoản : {profile.first_name} {profile.last_name}
        </CardTitle>
        <CardBody className="">
          <Container>
            <Row className="mt-3">
              <Col
                sm="12"
                md={{
                  offset: 2,
                  size: 8,
                }}
              >
                <Row>
                  <Col>
                    <img
                      src={profile.image}
                      className="rounded-circle"
                      alt="image"
                      width= '230'
                      height= '230'
                    />
                  </Col>
                  <Col>
                    <Row>
                      <Col lg='4'>
                        <Label for="exampleEmail">FirstName</Label>
                      </Col>
                      <Col lg='4'>
                        <Label for="exampleEmail">{profile.first_name}</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='4'>
                        <Label for="exampleEmail">LastName</Label>
                      </Col>
                      <Col lg='4'>
                        <Label for="exampleEmail">{profile.last_name}</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='4'>
                        <Label for="exampleEmail">Address</Label>
                      </Col>
                      <Col lg='4'>
                        <Label for="exampleEmail">{profile.address}</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='4'>
                        <Label for="exampleEmail">Email</Label>
                      </Col>
                      <Col lg='4'>
                        <Label for="exampleEmail">{profile.email}</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='4'>
                        <Label for="exampleEmail">Phone</Label>
                      </Col>
                      <Col lg='4'>
                        <Label for="exampleEmail">{profile.phone}</Label>
                      </Col>
                    </Row>
                    <div className="button-group">
                      <Link to='../../admin/edit-profile'>
                        <Button className="btn" color="primary">
                          Chỉnh sửa
                        </Button>
                      </Link>
                      <Button onClick={handleCancel} className="btn" color="danger">
                        Thoát
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </div>
  )
}
export default Profile
