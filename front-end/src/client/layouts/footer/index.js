import React from 'react'
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
                <Typography variant='subtitle2' sx={{ color: '#fff', marginTop: '20px' }}>Địa chỉ</Typography>
                <a href="https://www.facebook.com/kimdung.baker" className="footer_list-item-facebook">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3723.4737883168486!2d105.73291811476372!3d21.05373098598486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1651978387508!5m2!1svi!2s" width="100%" height="100%"  loading="lazy"></iframe>
                </a>
                <div className="footer_list-item-facebook-top">
                  <div className="footer_list-item-facebook-text">
                      <a className="footer_list-item-facebook-text-link" href="https://www.facebook.com/profile.php?id=100022482742485" target='_blank'>Địa chỉ FaceBook <i
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