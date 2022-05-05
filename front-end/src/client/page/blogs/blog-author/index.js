import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Box, Paper, Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import BlogItem from '../blog-item/index';
import Main from '../../../components/main/index'
import PageSort from '../../../components/page-sort/sort-left/index';
import Paginate from '../../../components/paginate/index';
import AnimatedPage from '../../../animation-page/AnimatedPage'
import { getBlogByUserId } from '../../../../redux/blogSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  margin: '0 0 30px 0',
  boxShadow: 'none',
  borderBottom: '1px solid gray',
  borderRadius: '0px'
}));

const BlogAuthor = () => {
  const { authorId } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  let listBlog = []

  const dispatch = useDispatch()
  const { blogs } = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(getBlogByUserId({ userId: authorId, params : {  page: currentPage, pageSize: 3 } }))
  }, [currentPage])

  if(blogs.blogs){
    listBlog = blogs.blogs
  }

  const handlePageChange = (e, pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <AnimatedPage>
      <Main/>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Box sx={{ marginTop: '50px' }}>
            <Grid container spacing={5}>
              <PageSort/>
              <Grid item xs={9.3}>
                {listBlog && listBlog.map((blog, index) => (
                  <Item key={index}>
                    <BlogItem
                      id={blog._id}
                      image={blog.image}
                      date={blog.createdAt}
                      productId={blog.productId}
                      title={blog.title}
                      content={blog.content}
                    />
                  </Item>
                ))}
                <Paginate
                  page={currentPage}
                  pageCount={blogs.pages}
                  handlePageChange={handlePageChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </AnimatedPage>
  )
}
export default BlogAuthor
