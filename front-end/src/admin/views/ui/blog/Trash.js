import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Label,
  ModalHeader,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getTrashBlogs, restoreBlog, forceDeleteBlog } from './../../../../redux/blogSlice';
import Paginate from './../paginate/Paginate';

const TrashBlog = () => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  let listBlog = []

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blogs, status } = useSelector(state => state.blogs)

  if(blogs.blogs){
    listBlog = blogs.blogs
  }

  useEffect(() => {
    dispatch(getTrashBlogs({ page: currentPage+1 }))
  }, [currentPage, status === 'blog restored', status === 'blog deleted force', open === false])

  const handleChangePage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }

  const handleRestore = (id) => {
    dispatch(restoreBlog(id))
    setId(id)
  }

  const handlecancel = () => {
    navigate(-1)
  }

  const handleDelete = (id) => {
    setOpen(true)
    setId(id)
  }

  const handleDeleteForce = () => {
    dispatch(forceDeleteBlog(id))
    setOpen(false)
  }

  return (
    <div>
      <div className='d-flex justify-content-between align-item-center pb-3'>
        <Label>Thùng rác của bạn</Label>
        <Button className="btn" color="primary" onClick={handlecancel}>
          Quay lại
        </Button>
      </div>
      <Row>
        {listBlog.map((blog, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Card>
              <div className='image-blog'>
                <CardImg alt="Card image cap" src={blog.image} />
              </div>
              <CardBody className="p-4">
                <CardTitle tag="h5">{blog.title}</CardTitle>
                <CardSubtitle>{blog.content}</CardSubtitle>
                <CardText className="mt-3">{blog.productId}</CardText>
                <div className="button-group">
                  <Button color='primary' onClick={() => handleRestore(blog._id)}>Khôi phục</Button>
                  <Button className="btn" color="danger" onClick={() => handleDelete(blog._id)}>
                    Xóa vĩnh viễn
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <div>
        <Modal isOpen={open}>
          <ModalHeader
            toggle={() => setOpen(!open)}
          >
            Xóa bài viết
          </ModalHeader>
          <ModalBody>
            Bạn có chắc chắn muốn xóa bài viết này không ?
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
        pages={blogs.pages}
      />
    </div>
  )
}
export default TrashBlog
