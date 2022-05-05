import React from 'react'
import { Box, Typography } from "@mui/material";
import { Link } from 'react-router-dom'

const styleBox = {
  height: 140,
  backgroundColor: "#000",
  display: 'flex',
  justifyContent: 'center',
  color: '#fff',
  alignItems: 'center',
  marginBottom: '50px'
}

const Main = () => {
  return (
    <Box sx={styleBox}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" component="div">
            Blog
          </Typography>
          <Typography variant="subtitle1" component="div">
            <Link to='/'>Home</Link>/Blog
          </Typography>
        </Box>
      </Box>
  )
}
export default Main
