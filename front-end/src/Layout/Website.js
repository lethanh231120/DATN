import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../client/layouts/header/index';
const Website = () => {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  )
}

export default Website
