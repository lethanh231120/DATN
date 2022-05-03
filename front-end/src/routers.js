import { Navigate, Outlet } from 'react-router-dom'
import { getCookie, STORAGEKEY } from './ultils/storage'
import { useSelector } from 'react-redux'

export const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = Boolean(getCookie(STORAGEKEY.ACCESS_TOKEN))
  return isAuthenticated ? <Component /> : <Navigate to='/login' />
}

export const PublicRouter = ({ component: Component }) => {
  const isAuthenticated = Boolean(getCookie(STORAGEKEY.ACCESS_TOKEN))
  return isAuthenticated ? <Navigate to='/' /> : <Component />
}

