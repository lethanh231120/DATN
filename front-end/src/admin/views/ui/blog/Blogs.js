import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Label } from "reactstrap";
import { getBlogs, deleteBlog } from './../../../../redux/blogSlice';
import BlogItem from './BlogItem';
import Paginate from './../paginate/Paginate';

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(0)
  let listBlog = []

  const dispatch = useDispatch()
  const { blogs, status } = useSelector(state => state.blogs)

  if(blogs.blogs){
    listBlog = blogs.blogs
  }

  useEffect(() => {
    dispatch(getBlogs({ page: currentPage+1 }))
  }, [currentPage, status === 'blog deleted'])

  const handleChangePage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }

  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
  }

  return (
    <div>
      <div className='d-flex justify-content-between align-item-center pb-3'>
        <div>
          <Label>Bài viết</Label>
          <Link to='../trash'>
            <Button className="btn" color="link">
              Thùng rác
            </Button>
          </Link>
        </div>
        <Link to='../../create-blog'>
          <Button className="btn" color="primary">
            Tạo Bài viết
          </Button>
        </Link>
      </div>
      <Row>
        {listBlog.map((blog, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <BlogItem
              id={blog._id}
              image={blog.image}
              title={blog.title}
              content={blog.content}
              color='primary'
              handleDelete={handleDelete}
            />
          </Col>
        ))}
      </Row>
      <Paginate
        handleChangePage={handleChangePage}
        currentPage={currentPage}
        pages={blogs.pages}
      />
    </div>
  )
}
export default Blogs
