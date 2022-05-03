import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { Box, Paper, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import './blog.scss'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  boxShadow: 'none'
}));
const styleTypographyDay = {
  fontSize: '50px',
  fontWeight: 'bold',
  color: 'rgba(0, 0, 0, 0.692)',
  cursor: 'pointer',
  '&:hover': {
    color:'#000',
  }
};
const styleTypographyMonth = {
  fontSize: '22px',
  fontWeight: 'bold',
  color: 'rgba(0, 0, 0, 0.295)',
  cursor: 'pointer',
  letterSpacing: '3px',
  '&:hover': {
    color:'#000',
  }
};

const Blog = ({ id, date, content, title }) => {
  return (
    <Grid container item xs={6}>
      <Grid item xs={3}>
        <Item className='blog-date'>
          <Link to={`blogs/${id}`}>
            <Typography sx={styleTypographyDay}>{moment(date).format("DD")}</Typography>
            <Typography sx={styleTypographyMonth}>{moment(date).format("MMMM")}</Typography>
          </Link>
        </Item>
      </Grid>
      <Grid item xs={9}>
        <Item sx={{ textAlign: 'left' }}>
          <Box className="blog-title">
            <Link to={`blogs/${id}`}>{title}</Link>
          </Box>
          <Box className="blog-content">
            {content}
          </Box>
          <Link to={`blogs/${id}`}>
            <Box className="blog-button">Xem chi tiết</Box>
          </Link>
        </Item>
      </Grid>
    </Grid>
  )
}
export default Blog
