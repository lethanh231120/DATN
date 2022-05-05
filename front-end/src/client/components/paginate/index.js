import React from 'react'
import { Stack, Box, Pagination } from '@mui/material';

const Paginate = (props) => {
  const { page, pageCount, handlePageChange } = props
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      padding: '50px 0',
    }}>
      <Stack spacing={2}>
        <Pagination
          page={page}
          color='primary'
          count={pageCount}
          onChange={handlePageChange}
         />
      </Stack>
    </Box>
  )
}
export default Paginate
