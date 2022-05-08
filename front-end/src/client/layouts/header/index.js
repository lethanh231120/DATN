import React, { useState, useEffect, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { Container, Dialog, List, Paper, Slide, Typography } from '@mui/material'
import { Box } from '@mui/system'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ChangePass from '../../modal/change-password/index'
import NavItem from './partials/NavItem'
import './partials/header.scss'
import Search from '../../page/search/index'
import { removeCookie, STORAGEKEY } from '../../../ultils/storage/index'
import { get } from '../../../api/BaseRequest'
import { resetUserInfo } from '../../../redux/userInfo'
import ModalComponent from './partials/Modal'
import { getUserInfo } from './../../../redux/userInfo';

const Style = {
  position: "relative",
  zIndex: 1
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='left' ref={ref} {...props} />
})

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false)
  const [openChangePassWord, setOpenChangePassWord] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(state => state.userInfo)

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickChangPassWord = () => {
    setOpenChangePassWord(!openChangePassWord)
  }

  const logout = async() => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN)
    await get('user/logout')
    dispatch(resetUserInfo())
    navigate('/')
  }

  return (
    <Box className='header'>
      <Container maxWidth='xl'>
        <Container maxWidth='xl'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
              gap: '10px',
              padding: '20px 0',
              borderBottom: '1px solid gray'
            }}
          >
          {isAuthenticated ? <>
              {(user && user.isAdmin) ?
                <Typography
                component='span'
                variant='subtitle1'
                fontWeight='bold'
              >
                <NavLink className='header__link' to='admin'>
                  {({ isActive }) => (
                    <Box
                      component='span'
                      className={isActive ? 'activeClassName' : ''}
                    >
                      Trang Admin
                    </Box>
                  )}
                </NavLink>
              </Typography> : ''}
              <Typography
                component='span'
                variant='subtitle1'
                fontWeight='bold'
              >
                <NavLink className='header__link' to='profile'>
                  {({ isActive }) => (
                    <Box
                      component='span'
                      className={isActive ? 'activeClassName' : ''}
                    >
                      {user && user.first_name}{user && user.last_name}
                    </Box>
                  )}
                </NavLink>
              </Typography>
              <Typography
                variant='subtitle1'
                onClick={() => setIsOpen(true)}
                className='header__link'
              >
                Change Password
              </Typography>
              <Typography
                variant='subtitle1'
                onClick={logout}
                className=' header__link'
              >
                Logout
              </Typography>
            </>
            : <>
              <Link to='register'>
                <Typography
                  variant='subtitle1'
                  className='header__link'
                >
                  Đăng ký
                </Typography>
              </Link>
              <Link to='login'>
                <Typography
                  variant='subtitle1'
                  className='header__link'
                >
                  Đăng nhập
                </Typography>
              </Link>
            </>}
          </Box>
          <Search isAuthenticated={isAuthenticated}/>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <Container>
              <Box
                marginTop={3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='h5'>ANDROLIN</Typography>
                <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
              </Box>
              <Box marginTop={1}>
                <List>
                  <Link to='profile' className='header__link'>
                    <NavItem
                      icon={<AccountBoxIcon />}
                      text='Profile'
                      onClick={handleClose}
                    />
                  </Link>

                  <NavItem
                    className='header__link'
                    icon={<LockIcon />}
                    text='Change Password'
                    onClick={handleClickChangPassWord}
                  />
                  <NavItem onClick={logout} icon={<LogoutIcon />} text='Logout' />
                </List>
              </Box>
            </Container>
          </Dialog>
        </Container>
      </Container>
      <Paper sx={Style}>
        <ModalComponent open={isOpen} onClose={() => setIsOpen(false)}>
          <ChangePass onClose={() => setIsOpen(false)} />
        </ModalComponent>
      </Paper>
    </Box>
  )
}
export default Header
