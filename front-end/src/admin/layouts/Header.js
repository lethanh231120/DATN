import React from "react";
import {
  Navbar,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { removeCookie, STORAGEKEY } from '../../ultils/storage/index'
import { get } from '../../api/BaseRequest'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetUserInfo } from '../../redux/userInfo'
import './header.css'

const Header = ({ userInfo }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const logout = async() => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN)
    await get('user/logout')
    dispatch(resetUserInfo())
    navigate('/admin')
  }

  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          ANDROLIN
        </div>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <Dropdown isOpen={dropdownOpen} className="ml-auto" toggle={toggle}>
        <DropdownToggle color="transparent">
          <img
            src={userInfo.image}
            alt="profile"
            className="rounded-circle avatar"
          ></img>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <Link className='link' to='../../admin/my-profile'>My Account</Link>
          </DropdownItem>
          <DropdownItem>
            <Link className='link' to='../../admin/edit-profile'>Edit Profile</Link>
          </DropdownItem>
          <DropdownItem onClick={logout}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
};

export default Header;
