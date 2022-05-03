import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Table, Row,
  Col,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { getTrashUsers, restoreUser, forceDeleteUser } from "../../../../redux/userSlice";
import Paginate from "../paginate/Paginate";

const TrashUser = () => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  let listUser = []

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getTrashUsers({ page: currentPage+1 }))
  }, [currentPage, open, id])

  if(users.users){
    listUser = users.users
  }

  const handleChangePage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }

  const handleRestore = (id) => {
    dispatch(restoreUser(id))
    setId(id)
  }

  const handleDelete = (id) => {
    setOpen(true)
    setId(id)
  }

  const handleDeleteForce = () => {
    dispatch(forceDeleteUser(id))
    setOpen(false)
  }

  const handlecancel = () => {
    navigate(-1)
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <Row>
              <Col lg='10'>
                <i className="bi bi-card-text me-2"> </i>
                Danh sách user
              </Col>
              <Col lg='2'>
                <Link to='../../create-user'>
                  <Button className="btn" color="primary" onClick={handlecancel}>
                    Quay lại
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
              {listUser === [] ?
                <tr>Không có dữ liệu</tr>
                :listUser.map((item, index) => (
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
                    <Button color='primary' onClick={() => handleRestore(item._id)}>
                      Khôi phục
                    </Button>
                    <Button className="btn" color="danger" onClick={() => handleDelete(item._id)}>
                      Xóa vĩnh viễn
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
        <div>
          <Modal isOpen={open}>
            <ModalHeader
              toggle={() => setOpen(!open)}
            >
              Xóa tài khoản
            </ModalHeader>
            <ModalBody>
              Bạn có chắc chắn muốn xóa tài khoản này không ?
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={handleDeleteForce}
              >
                Xóa
              </Button>
              <Button onClick={() => setOpen(!open)} color='danger'>
                Hủy
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

export default TrashUser;
