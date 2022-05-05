import { styled } from '@mui/material/styles';
import { Paper, TextField, Button } from '@mui/material';

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  textAlign: 'left',
  boxShadow: 'none'
}));
export const styleTypography = {
  fontWeight: 'bold',
  color: '#000',
  margin: '50px 0 30px'
}
export const styleAvatar = {
  width: '100%',
  height: '350px',
  objectFit: 'cover',
  border: '.2px solid rgba(0,0,0,.1);'
}
export const stylePaper = {
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  marginBottom: '30px',
  borderRadius: '0px'
}
export const CssTextField = styled(TextField)({
  '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
    outline: 'none',
    borderRadius: '0px',
    backgroundColor: 'transparent',
    color: '#000',
  },
  '& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root': {
    padding: '0px'
  },
  '& .MuiInputBase-input': {
    backgroundColor: '#fff',
    padding: '16.5px 14px'
  },
  marginBottom: '20px',
  width: '100%'
})
export const CssButton = styled(Button)({
  backgroundColor: 'transparent',
  border: '1px solid #000',
  color: '#000',
  cursor: 'pointer',
  borderRadius: '0px',
  '&:hover':{
    backgroundColor: '#000',
    color: '#fff',
  }
})
