import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Table,
  Card,
  CardTitle,
  CardBody,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getTrashProducts, forceDeleteProduct, restoreProduct } from '../../../../redux/productSlice'
import './product.scss'
import Paginate from '../paginate/Paginate';

const TrashProduct = () => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  let listProduct = []
  let listCategory = []

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { products, message } = useSelector((state) => state.products)
  const { categories } = useSelector((state) => state.categories)

  if(products.products){
    listProduct = products.products
  }

  useEffect(() => {
    dispatch(getTrashProducts({ page: currentPage+1 }))
  }, [currentPage, open === false, id, (message === 'success')])

  if(categories.categories){
    listCategory = categories.categories
  }

  const handleChangePage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }

  const handlecancel = () => {
    navigate(-1)
  }

  const handleRestore = (id) => {
    dispatch(restoreProduct(id))
    setId(id)
  }

  const handleDelete = (id) => {
    setOpen(true)
    setId(id)
  }

  const handleDeleteForce = () => {
    dispatch(forceDeleteProduct(id))
    setOpen(false)
  }

  const renderCategory = (id) => {
    const result = listCategory.filter(category => (category._id === id))
    return(result[0] && result[0].name)
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <Row>
              <Col lg='10'>
                <i className="bi bi-card-text me-2"> </i>
                Thùng rác của bạn
              </Col>
              <Col lg='2'>
                <Button className="btn" color="primary" onClick={handlecancel}>
                  Quay lại
                </Button>
              </Col>
            </Row>
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Anh</th>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Gía bán</th>
                  <th>Số lượng có</th>
                  <th>Bình luận</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listProduct.map((item, index) =>
                  <tr key={index}>
                    <th>{index+1}</th>
                    <td className='image-product'>
                      <img src={item.listImage[0]} alt='avtar'></img>
                    </td>
                    <td>{item.name}</td>
                    <td>{renderCategory(item.categoryId)}</td>
                    <td>{item.price}</td>
                    <td>{item.countInStock}</td>
                    <td>{item.numberOfReviews}</td>
                    <td>
                      <Button color='primary' onClick={() => handleRestore(item._id)}>
                        Khôi phục
                      </Button>
                      <Button className="btn" color="danger" onClick={() => handleDelete(item._id)}>
                        Xóa vĩnh viễn
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
          <div>
            <Modal isOpen={open}>
              <ModalHeader
                toggle={() => setOpen(!open)}
              >
                Xóa sản phẩm
              </ModalHeader>
              <ModalBody>
                Bạn có chắc chắn muốn xóa sản phẩm này không ?
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
            pages={products.pages}
          />
        </Card>
      </Col>
    </Row>
  )
}
export default TrashProduct
