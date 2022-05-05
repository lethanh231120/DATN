import React from 'react'
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import HeaderAdmin from "../admin/layouts/Header";
import Sidebar from '../admin/layouts/Sidebar'
import '../admin/assets/scss/style.scss'
const Admin = () => {
  return (
    <main>
      <HeaderAdmin />
      <div className="d-flex">
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
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
