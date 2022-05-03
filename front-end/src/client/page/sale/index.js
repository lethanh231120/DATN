import React from "react";
import { Avatar, Box, Grid } from '@mui/material';
import { Item, styleAvatar } from '../../components/assets/style'
import './sale.scss'

export default function Sale() {
  return (
    <Grid container>
      <Grid item xs={7}>
        <Item sx={{ position: 'relative' }}>
          <Avatar
            className='avatar'
            variant='square'
            sx={styleAvatar}
            src='./images/sale1.jpg'
          />
          <Box className='avatar-content'>
            <Box className='avatar-sale-title'>50% late on Gaming</Box>
            <Box className='avatar-sale-name'>Samsung Gear 360 Degree</Box>
            <Box className='avatar-sale-number'>Xbox Gaming Console For Play Lover</Box>
          </Box>
        </Item>
      </Grid>
      <Grid item xs={5}>
        <Item sx={{ position: 'relative' }}>
          <Avatar
            className='avatar'
            variant='square'
            sx={styleAvatar}
            src='./images/sale2.jpg'
          />
          <Box className='avatar-content'>
            <Box className='avatar-sale-name'>Gearbox Zebronic VR100</Box>
            <Box className='avatar-sale-number'>Virtual Reality Headset</Box>
          </Box>
        </Item>
      </Grid>
      <Grid item xs={5}>
        <Item sx={{ position: 'relative' }}>
          <Avatar
            className='avatar'
            variant='square'
            sx={styleAvatar}
            src='./images/sale3.jpg'
          />
          <Box className='avatar-content left'>
            <Box className='avatar-sale-name'>Technica Quietpoint</Box>
            <Box className='avatar-sale-number'>Virtual Reality Headset</Box>
          </Box>
        </Item>
      </Grid>
      <Grid item xs={7}>
        <Item sx={{ position: 'relative' }}>
          <Avatar
            className='avatar'
            variant='square'
            sx={styleAvatar}
            src='./images/sale4.jpg'
          />
          <Box className='avatar-content left'>
            <Box className='avatar-sale-title'>50% late on Gaming</Box>
            <Box className='avatar-sale-name'>Samsung Gear 360 Degree</Box>
            <Box className='avatar-sale-number'>Xbox Gaming Console For Play Lover</Box>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}

