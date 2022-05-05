import { TextField, styled } from '@mui/material'

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


