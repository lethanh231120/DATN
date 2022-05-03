import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography, Box, Grid } from '@mui/material';
import { Link as MenuLink } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Item, styleIcon, styleText } from './style'
import './footer.scss'

const Footer = () => {
  return (
    <Grid container spacing={1} sx={{ backgroundColor: '#000', marginTop:'50px', padding: '60px 0'}}>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Grid container item spacing={3}>
            <Grid item xs={2.4}>
              <Item>
                <Typography variant='h4' sx={{ color: '#fff', fontWeight: 'bold' }}>ANDROLIN</Typography>
                <Box className="footer_list-item-introduce">
                  <RoomIcon sx={styleIcon}/>
                  <Typography sx={styleText}>Số 298 Đ. Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội</Typography>
                </Box>
                <Box className="footer_list-item-introduce">
                  <PhoneIcon sx={styleIcon}/>
                  <Typography sx={styleText}>0866 068 789</Typography>
                </Box>
                <Box className="footer_list-item-introduce">
                  <AccessTimeIcon sx={styleIcon}/>
                  <Typography sx={styleText}>Tất cả các ngày trong tuần.</Typography>
                </Box>
                <Box className="footer_list-item-introduce">
                  <MailOutlineIcon sx={styleIcon}/>
                  <Typography sx={styleText}>lethanh231120@gmail.com</Typography>
                </Box>
              </Item>
            </Grid>
            <Grid item xs={2.4}>
              <Item>
                <Typography variant='h6' sx={{ color: '#fff' }}>FaceBook</Typography>
                <a href="https://www.facebook.com/kimdung.baker" className="footer_list-item-facebook">
                  <img className="footer_list-item-facebook-personal"
                    src="https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-1/s320x320/101436493_102228714864907_4152631212052034336_n.jpg?_nc_cat=107&amp;ccb=1-3&amp;_nc_sid=7206a8&amp;_nc_ohc=MZKHZXW5e9UAX9QcmwU&amp;_nc_ht=scontent.fhan2-3.fna&amp;oh=dcadc63092896352feeb905ce8b8f2aa&amp;oe=60EFC8F7"
                    alt=""/>
                </a>
                <div className="footer_list-item-facebook-top">
                  <a href="https://www.facebook.com/kimdung.baker"><i
                      className="fab fa-facebook footer_list-item-facebook-top-link"></i></a>
                  <div className="footer_list-item-facebook-text">
                      <a className="footer_list-item-facebook-text-link" href="https://www.facebook.com/kimdung.baker">FaceBook <i
                          className="fas fa-check-square"></i></a>
                  </div>
                </div>
              </Item>
            </Grid>
            <Grid item xs={2.4}>
              <Item>
                <Typography variant='h6' sx={{ color: '#fff' }}>My Account</Typography>
                <Box className='footer-item' ><MenuLink href='/'>My Account</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>Checkout</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>Order</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>Help & Support</MenuLink></Box>
              </Item>
            </Grid>
            <Grid item xs={2.4}>
              <Item>
                <Typography variant='h6' sx={{ color: '#fff' }}>Menu</Typography>
                <Box className='footer-item' ><MenuLink href='/'>Home</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>List Product</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>About Us</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>Blogs</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>Contact Us</MenuLink></Box>
              </Item>
            </Grid>
            <Grid item xs={2.4}>
              <Item>
                <Typography variant='h6' sx={{ color: '#fff' }}>Menu</Typography>
                <Box className='footer-item' ><MenuLink href='/'>Home</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>List Product</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>About Us</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>Blogs</MenuLink></Box>
                <Box className='footer-item' ><MenuLink href='/'>Contact Us</MenuLink></Box>
              </Item>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Grid>
  )
}
export default Footer