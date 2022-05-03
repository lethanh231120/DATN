import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
const PageNotFound = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Typography variant='h5' component='h6'>
        Sorry, this page is not available.
      </Typography>
      <Typography variant='subtitle1'>
        The link you followed may be broken, or the page may have been removed.
        <Link to='/'>Go back to Home</Link>
      </Typography>
    </Box>
  )
}
export default PageNotFound
