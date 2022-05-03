import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, useMediaQuery, Badge } from '@mui/material'
import { getAllCarts } from '../../../redux/cartSlice';
import { getAllWishlist } from '../../../redux/wishlistSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home'
import ViewListIcon from '@mui/icons-material/ViewList';
import GroupIcon from '@mui/icons-material/Group';
import PostAddIcon from '@mui/icons-material/PostAdd';
import './search.scss'

const navbar = [
  {
    name: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    name: 'Product Category',
    path: 'product-category',
    icon: ViewListIcon,
  },
  {
    name: 'About Us',
    path: 'about-us',
    icon: GroupIcon,
  },
  {
    name: 'Blogs',
    path: 'blogs',
    icon: PostAddIcon,
  }
]

const Search = ({ isAuthenticated }) => {
  const matchesSm = useMediaQuery('(max-width:810px)')
  const matchesXs = useMediaQuery('(max-width:399px)')

  const dispatch = useDispatch()
  const { carts, status } = useSelector(state => state.carts)
  const { wishlists, message } = useSelector(state => state.wishlists)

  useEffect(() => {
    isAuthenticated && dispatch(getAllCarts())
  }, [status === 'add cart successfully'])

  useEffect(() => {
    isAuthenticated && dispatch(getAllWishlist())
  }, [message === 'add wishlist successfully'])

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {!matchesSm ? (
        <Typography variant='subtitle1'>
          <Link to='/' className='header__logo'>androlin</Link>
        </Typography>
      ) : matchesSm && ('')}
      {!matchesXs && (
        <Box display='flex' gap={1}>
          {navbar.map((item) => (
            <Typography key={item.name} variant='subtitle1'>
              <NavLink className='header__link' to={item.path}>
                {({ isActive }) => (
                  <Box
                    component='span'
                    className={isActive ? 'activeClassName' : ''}
                  >
                    {item.name}
                  </Box>
                )}
              </NavLink>
            </Typography>
          ))}
        </Box>
      )}
      <Box className='icons'>
        { isAuthenticated
        ? <>
          <Typography
            component='span'
            sx={{ width: '50px', textAlign: 'center'}}
          >
            <NavLink className='search-icon' to='wishlist'>
              {({ isActive }) => (
                <Box
                  component='span'
                  className={isActive ? 'activeClassName' : ''}
                >
                  <Badge color="secondary" badgeContent={wishlists.products ? wishlists.products.length : 0}>
                    <FavoriteBorderIcon />
                  </Badge>
                </Box>
              )}
            </NavLink>
          </Typography>
          <Typography
            component='span'
            sx={{ width: '50px', textAlign: 'center'}}
          >
            <NavLink className='search-icon' to='cart'>
              {({ isActive }) => (
                <Box
                  component='span'
                  className={isActive ? 'activeClassName' : ''}
                >
                  <Badge color="secondary" badgeContent={carts.products ? carts.products.length : 0}>
                    <ShoppingCartIcon />
                  </Badge>
                </Box>
              )}
            </NavLink>
          </Typography>
        </> : ''}
      </Box>
    </Box>
  )
}
export default Search
