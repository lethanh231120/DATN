import { Box, styled } from '@mui/material'

export const StyleIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  cursor: 'pointer',
  color: '#000',
  transition: 'all 0.15s linear',
  '&:hover': {
    backgroundColor: '#ffba00',
  },
}))

