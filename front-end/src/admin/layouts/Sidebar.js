import { Button, Nav, NavItem } from "reactstrap";
import { NavLink, useLocation } from "react-router-dom";
import './header.css'

const navigation = [
  {
    title: "Trang Chủ",
    path: "/admin",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Category",
    path: "category",
    icon: "bi bi-card-list",
  },
  {
    title: "Product",
    path: "list-product",
    icon: "bi bi-watch",
  },
  {
    title: "Order",
    path: "order",
    icon: "bi bi-bag-check-fill",
  },
  {
    title: "User",
    path: "user",
    icon: "bi bi-people-fill",
  },
  {
    title: "Blogs",
    path: "blog",
    icon: "bi bi-file-earmark-post-fill",
  },
  {
    title: "Chuyển sang client",
    path: "/",
    icon: "bi bi-file-richtext-fill",
  }
];

const Sidebar = ({ userInfo }) => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profile"
        style={{ background: `url(${userInfo.image}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={userInfo.image} alt="user" className="rounded-circle avatar" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">{userInfo.first_name} {userInfo.last_name}</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <NavLink
                to={navi.path}
                className={
                  location.pathname === navi.path
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
