import React from 'react'
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import HeaderAdmin from "../admin/layouts/Header";
import Sidebar from '../admin/layouts/Sidebar'
import '../admin/assets/scss/style.scss'
import { useSelector } from 'react-redux';
const Admin = () => {
  const { user } = useSelector(state => state.userInfo)

  return (
    <main>
      <HeaderAdmin userInfo={user && user}/>
      <div className="d-flex">
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar userInfo={user && user}/>
        </aside>
        <div className="contentArea">
          <Container className="p-4" fluid>
            <Outlet/>
          </Container>
        </div>
      </div>
    </main>
  )
}

export default Admin
