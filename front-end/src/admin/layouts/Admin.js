import React from 'react'
import HeaderAdmin from "./Header";
import Sidebar from './Sidebar'
import { Container } from "reactstrap";
import { Outlet } from "react-router-dom";

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
