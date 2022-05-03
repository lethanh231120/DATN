import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Table,
  Card,
  CardTitle,
  CardBody,
  ModalHeader,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";
import { getTrashCategories, restoreCategory,  forceDeleteCategory } from '../../../../redux/categorySlice';
import Paginate from '../paginate/Paginate';

const TrashCategory = () => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  let listCategory = []

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categories } = useSelector((state) => state.categories)

  if(categories.categories){
    listCategory = categories.categories
  }

  useEffect(() => {
    dispatch(getTrashCategories({ page: currentPage+1 }))
  }, [currentPage, open, id])

  const handleChangePage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleRestore = (id) => {
    dispatch(restoreCategory(id))
    setId(id)
  }

  const handleDelete = (id) => {
    setOpen(true)
    setId(id)
  }

  const handleDeleteForce = () => {
    dispatch(forceDeleteCategory(id))
    setOpen(false)
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <Row>
              <Col lg='10'>
                <i className="bi bi-card-text me-2"> </i>
                Danh sách danh mục
              </Col>
              <Col lg='2'>
                <Button
                  color="primary"
                  onClick={handleCancel}
                >
                  Quay lại
                </Button>
              </Col>
            </Row>
          </CardTitle>
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên danh mục</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                { listCategory.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index+1}</th>
                    <td>{item.name}</td>
                    <td>
                      <Button onClick={() => handleRestore(item._id)} color="primary">
                        khôi phục
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
                Xóa danh mục
              </ModalHeader>
              <ModalBody>
                Bạn có chắc chắn muốn xóa danh mục này không ?
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
            pages={categories.pages}
          />
        </Card>
      </Col>
    </Row>
  )
}
export default TrashCategory
