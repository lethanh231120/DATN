import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter, Input } from "reactstrap";
import { searchUsers } from "../../../../redux/userSlice";
import Paginate from "../paginate/Paginate";
import { del } from "../../../../api/BaseRequest";

const User = () => {
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState()
  const [searchName, setSearchName] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  let listUser = []
  let message = ''
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(searchUsers({ page: currentPage+1 }))
  }, [currentPage, id, dispatch])

  if(users.users){
    listUser = users.users
  }
  if(users.total_User === 0){
    message = 'Không tồn tại tài khoản'
  }

  const handleChangePage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }

  const handleDelete = async(id) => {
    try{
      await del(`users/${id}`)
      setId(id)
    }catch(error){
      error?.response?.data && setError(error.response.data.message)
      setOpen(true)
    }
  }

  const handleSubmitSearch = () => {
    const params = { name: searchName, page: currentPage+1 }
    dispatch(searchUsers(params ))
    setSearchName('')
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <Row>
              <Col lg='4'>
                <i className="bi bi-card-text me-2"> </i>
                Danh sách user
                <Link to='../trash'>
                  <Button className="btn" color="link">
                    Thùng rác
                  </Button>
                </Link>
              </Col>
              <Col lg='6'>
                <Row>
                  <Col lg='5'>
                    <Input
                      placeholder="Tên tài khoản (vd: Nam)"
                      type="text"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                  </Col>
                  <Col lg='1'>
                    <Button color='primary' onClick={handleSubmitSearch}>Lọc</Button>
                  </Col>
                </Row>
              </Col>
              <Col lg='2'>
                <Link to='../../create-user'>
                  <Button className="btn" color="primary">
                    Thêm tài khoản
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>#</th>
                <th>Anh</th>
                <th>fullname</th>
                <th>Loại tài khoản</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {message !== '' ?
                <tr><td>{message}</td></tr>
              : listUser.map((item, index) => (
                <tr key={index} className="border-top">
                  <td>{index+1}</td>
                  <td>
                    <img
                      src={item.image}
                      className="rounded-circle"
                      alt="image"
                      width="45"
                      height="45"
                    />
                  </td>
                  <td>{item.first_name}{item.last_name}</td>
                  <td>{(item.isAdmin) === true ? 'Admin' : 'User'}</td>
                  <td>
                    {item.isWork === true ? (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>
                    <Link to={`../../user/${item._id}`}>
                      <Button color='primary'>
                        <i className="bi bi-eye"></i>
                      </Button>
                    </Link>
                    <Link to={`../../edit-user/${item._id}`}>
                      <Button color='success'>
                        <i className="bi bi-pencil"></i>
                      </Button>
                    </Link>
                    <Button color='danger' onClick={() => handleDelete(item._id)}>
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
        <div>
          <Modal isOpen={open}>
            <ModalBody>{error}</ModalBody>
            <ModalFooter>
              <Button onClick={() => setOpen(!open)} color='primary'>
                Đồng ý
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <Paginate
          handleChangePage={handleChangePage}
          currentPage={currentPage}
          pages={users.pages}
        />
      </Card>
    </div>
  );
};

export default User;
