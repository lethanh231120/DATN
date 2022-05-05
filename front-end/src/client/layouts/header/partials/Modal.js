import React from 'react'
import { Box } from '@mui/material'

const ModalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#fff",
  zIndex: 1000,
  transition: 'all 0.25s line'
};
const OverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
  transition: 'all 2s easy-in-out',
};

const ModalComponent = ({ open, children }) => {
  if (!open) return null;
  return (
    <>
    <Box sx={OverlayStyle} />
    <Box sx={ModalStyle}>
      {children}
    </Box>
  </>
  )
}
export default ModalComponent
