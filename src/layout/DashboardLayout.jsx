import { Outlet, Link, useLocation } from "react-router-dom";
import "../Style/DashboardLayout.css";
import {
  FaBars,
  FaHome,
  FaList,
  FaBox,
  FaInfoCircle,
  FaImage,
  FaBullhorn,
  FaStar,
  FaMoneyCheckAlt,
  FaCashRegister,
  FaChartLine,
  FaUserShield,
  FaUser,
} from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";

import { CiLogin } from "react-icons/ci";
import { useState } from "react";

import logo from '../assets/Img/logo.jpg'

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebar,setSideBar] = useState("")

  const links = [
    { path: "/dashboard/admin/control", label: "Dashboard", icon: <FaHome className="icon" /> },
    { path: "/dashboard/admin/control/category", label: "Category", icon: <FaList className="icon" /> },
    { path: "/dashboard/admin/control/products", label: "Product", icon: <FaBox className="icon" /> },
    { path: "/dashboard/admin/control/services", label: "Services", icon: <MdDesignServices className="icon" /> },
    { path: "/dashboard/admin/control/about-us", label: "About Us", icon: <FaInfoCircle className="icon" /> },
    { path: "/dashboard/admin/control/banner", label: "Banner", icon: <FaImage className="icon" /> },
    { path: "/dashboard/admin/control/advertising", label: "Advertising", icon: <FaBullhorn className="icon" /> },
    { path: "/dashboard/admin/control/review", label: "Review", icon: <FaStar className="icon" /> },
    { path: "/dashboard/admin/control/payment", label: "Payment", icon: <FaMoneyCheckAlt className="icon" /> },
    { path: "/dashboard/admin/control/cashback", label: "Cashback", icon: <FaCashRegister className="icon" /> },
    { path: "/dashboard/admin/control/sales", label: "Sales", icon: <FaChartLine className="icon" /> },
    { path: "/dashboard/admin/control/admin", label: "Admin", icon: <FaUserShield className="icon" /> },
    { path: "/dashboard/admin/control/user", label: "User", icon: <FaUser className="icon" /> },
    { path: "/", label: "Logout", icon: <CiLogin className="icon" /> },
  ];

  const toggleSideBar = () => {
    setSideBar(!sidebar);
  };

  const toggleSideBarMobile = () => {
    if (window.innerWidth < 992) {
      setSideBar(!sidebar);
    }
  };
  

  const getLinkClass = (path) => {
    return location.pathname === path ? "active" : ""; 
  };

  return (
    <div className="dashboard-layout">
        <div className={`${sidebar&&"overlay-dashboard"}`}></div>
      <aside className={`sidebar ${sidebar&&"small-sidebar"}`}>
        <h2 className="sidebar-heading">
            <img className="logo" src={logo} />
            <p>M&R For Trading</p>
        </h2>
        <nav className="sidebar-nav">
          <ul>
            {links.map((link) => (
              <li className={getLinkClass(link.path)} key={link.path}>
                <Link to={link.path} onClick={toggleSideBarMobile}>
                  {link.icon}
                  <p> {link.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="header-dashboard header">
          <h1 className="header-title " onClick={toggleSideBar}>
            <FaBars/>
          </h1>
        </header>
        <main className="main">
          <div className="content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
