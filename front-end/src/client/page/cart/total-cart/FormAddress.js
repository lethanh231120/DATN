import React from 'react'
import { Typography, AccordionSummary, AccordionDetails, MenuItem, FormControl, TextField, Select, Accordion, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from '@mui/material/styles';
import { CssButton } from '../../../components/assets/style'

const StyleAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: '0px !important',
  border: '1px solid gray',
  borderRadius: '0px !important'
}));

const StyleAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  textAlign: 'center !important'
}));

const CssTextField = styled(TextField)({
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
const FormAddress = (props) => {
  const {
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeCommune,
    handleChangeApartmentNumber,
    handleChangePayment,
    address,
    listProvince,
    listDistrict,
    listCommune,
    payment,
    handleSubmitCreateOrder
  } = props
  return (
    <StyleAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant='subtitle2'>Nhập địa chỉ để mua hàng </Typography>
        <Typography color='red' variant='caption'> (*)</Typography>
      </AccordionSummary>
      <StyleAccordionDetails>
        <FormControl sx={{ mb: 2, width:'100%' }} size="small">
          <Select
            value={address.province}
            onChange={handleChangeProvince}
          >
            <MenuItem value={address.province}>{address.province}</MenuItem>
            {listProvince && listProvince.map((item) => (
              <MenuItem
                key={item.code}
                value={item.code}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 2, width:'100%' }} size="small">
          <Select
            value={address.district}
            onChange={handleChangeDistrict}
          >
            <MenuItem value={address.district}>{address.district}</MenuItem>
            {listDistrict && listDistrict.map((item) => (
              <MenuItem
                key={item.code}
                value={item.code}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 2, width:'100%' }} size="small">
          <Select
            value={address.commune}
            onChange={handleChangeCommune}
          >
            <MenuItem value={address.commune}>{address.commune}</MenuItem>
            {listCommune && listCommune.map((item) => (
              <MenuItem
                key={item.code}
                value={item.code}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 2, width:'100%' }} >
          <CssTextField
            placeholder={address.apartmentNumber}
            onChange={handleChangeApartmentNumber}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: '20px', width:'100%', textAlign: 'left' }}>
          <FormLabel>Hình thức thanh toán</FormLabel>
          <RadioGroup
            row
            value={payment}
            onChange={handleChangePayment}
          >
            <FormControlLabel value='0' control={<Radio />} label="Trực tiếp" />
            <FormControlLabel value='1' control={<Radio />} label="Thanh toán qua paypal" />
          </RadioGroup>
        </FormControl>
        <CssButton onClick={handleSubmitCreateOrder}>Tạo đơn hàng</CssButton>
      </StyleAccordionDetails>
  </StyleAccordion>
  )
}

export default FormAddress