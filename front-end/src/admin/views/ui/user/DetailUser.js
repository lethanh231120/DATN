import React, { useEffect } from 'react'
import { Container, Col, Row, Card, CardBody, CardTitle, Label, Button } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from '../../../../redux/userSlice'

const DetailUser = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUserById(id))
  }, [])

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Thông tin tài khoản : Lê Thành
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
                      src={users.image}
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
                        <Label for="exampleEmail">{users.first_name}</Label>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg='4'>
                        <Label for="exampleEmail">LastName</Label>
                      </Col>
                      <Col lg='4'>
                        <Label for="exampleEmail">{users.last_name}</Label>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg='4'>
                        <Label for="exampleEmail">Address</Label>
                      </Col>
                      <Col lg='4'>
                        <Label for="exampleEmail">{users.address}</Label>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg='4'>
                        <Label for="exampleEmail">Email</Label>
                      </Col>
                      <Col lg='4'>
                        <Label for="exampleEmail">{users.email}</Label>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg='4'>
                        <Label for="exampleEmail">Phone</Label>
                      </Col>
                      <Col lg='4'>
                        <Label for="exampleEmail">{users.phone}</Label>
                      </Col>
                    </Row>

                    <div className="button-group">
                      <Link to={`../../edit-user/${id}`}>
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
export default DetailUser
