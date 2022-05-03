import { TextField, Paper, styled, Box, InputLabel, Button } from '@mui/material'

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))
export const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset'
    }
  },
  '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
    padding: '0 0 0 10px',
    fontSize: '14px',
    height: '45px'
  },
  '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
    borderRadius: '2px',
    color: '#000'
  },
  '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:focus': {
    outline: 'none'
  },
  '& .css-1wc848c-MuiFormHelperText-root': {
    margin: '0px'
  },
  '& .css-1wc848c-MuiFormHelperText-root.Mui-error': {
    color: 'red',
    fontSize: '14px'
  }
})
export const StyledBox = styled(Box)(() => ({
  padding: '30px 40px',
  position: 'relative',
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}))
export const StyleItem = styled(InputLabel)(() => ({
  height: '47px',
  color: '#000',
  fontSize: '12px',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center'
}))
export const StyleButton = styled(Button)(() => ({
  borderRadius: '3px',
  fontSize: '12px',
  width: '90px',
  margin: '0px auto',
  textTransform: 'none',
  marginTop: '10px'
}))

