import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  textAlign: "center",
  boxShadow: 'none',
  textAlign: 'left'
}));
export const styleIcon = {
  fontSize: '30px',
  color: 'rgb(185, 180, 180)',
  marginRight: '10px',
  '&:hover':{
    color: '#fff'
  }
}
export const styleText = {
  fontSize: '14px',
  color: 'rgb(185, 180, 180)',
  '&:hover':{
    color: '#fff'
  }
}