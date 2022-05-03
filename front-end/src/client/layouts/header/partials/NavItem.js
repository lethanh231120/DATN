import React from 'react'
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem
} from '@mui/material'

const NavItem = ({ icon, text, onClick }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}
export default NavItem

