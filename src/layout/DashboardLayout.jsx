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
  FaChartLine,
  FaUserShield,
  FaUser,
  FaRegHandPointer,
  FaImages,
  FaInfo
} from "react-icons/fa";
import { AiFillInteraction } from "react-icons/ai";
import { TbDiscount } from "react-icons/tb";
import { CiInboxOut } from "react-icons/ci";
import { VscReferences } from "react-icons/vsc";

import { MdDesignServices ,MdConnectWithoutContact, MdOutlineFeaturedPlayList,MdOutlineContactMail,MdOutlineMediation } from "react-icons/md";

import {CiMaximize1 , CiLogin } from "react-icons/ci";
import { useState } from "react";

import logo from '../assets/Img/logo.jpg'

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebar,setSideBar] = useState("")
  const res = document.cookie.split('; ').find(row => row.startsWith('res='))?.split('=')[1];
  
  const handleLogOut = () => {
    document.cookie = "tokenAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  const links = [
    { path: "/dashboard/admin/control", label: "Dashboard", icon: <FaHome className="icon" /> },
    { path: "/dashboard/admin/control/category", label: "Category", icon: <FaList className="icon" /> },
    { path: "/dashboard/admin/control/products", label: "Product", icon: <FaBox className="icon" /> },
    { path: "/dashboard/admin/control/services", label: "Services", icon: <MdDesignServices className="icon" /> },
    { path: "/dashboard/admin/control/about-us", label: "About Us", icon: <FaInfoCircle className="icon" /> },
    { path: "/dashboard/admin/control/why-us", label: "Why Us", icon: <FaRegHandPointer className="icon" /> },
    { path: "/dashboard/admin/control/banner", label: "Banner", icon: <FaImage className="icon" /> },
    { path: "/dashboard/admin/control/advertising", label: "Advertising", icon: <FaBullhorn className="icon" /> },
    { path: "/dashboard/admin/control/review", label: "Review", icon: <FaStar className="icon" /> },
    { path: "/dashboard/admin/control/contact", label: "Contact us", icon: <MdConnectWithoutContact className="icon" /> },
    { path: "/dashboard/admin/control/feature", label: "Feature", icon: <MdOutlineFeaturedPlayList className="icon" /> },
    { path: "/dashboard/admin/control/subscribe", label: "Subscribe", icon: <AiFillInteraction className="icon" /> },
    { path: "/dashboard/admin/control/image-banner", label: "Image Banners", icon: <FaImages  className="icon" /> },
    { path: "/dashboard/admin/control/social-link", label: "Social Media", icon: <MdOutlineMediation   className="icon" /> },
    { path: "/dashboard/admin/control/ProductOutOfStock", label: "Product Out Of Stick", icon: <CiInboxOut   className="icon" /> },
    { path: "/dashboard/admin/control/over-all-info", label: "Over All Info", icon: <FaInfo   className="icon" /> },
    { path: "/dashboard/admin/control/payment", label: "Payment", icon: <FaMoneyCheckAlt className="icon" /> },
    { path: "/dashboard/admin/control/contact-us-section", label: "Contact Us Section", icon: <MdOutlineContactMail className="icon" /> },
    { path: "/dashboard/admin/control/discount", label: "Discount", icon: <TbDiscount className="icon" /> },
    { path: "/dashboard/admin/control/sales", label: "Sales", icon: <FaChartLine className="icon" /> },
    { path: "/dashboard/admin/control/Rev-sales", label: "Rev Sales", icon: <CiMaximize1 className="icon" /> },
    { path: "/dashboard/admin/control/admin", label: "Admin", icon: <FaUserShield className="icon" /> },
    { path: "/dashboard/admin/control/user", label: "User", icon: <FaUser className="icon" /> },
    { path: "/dashboard/admin/control/referred-customer", label: "Referred Customers", icon: <VscReferences className="icon" /> },
    // { path: "/", label: "Logout", icon: <CiLogin className="icon" /> , onClick: handleLogOut 
    // },
  ];


  const filteredLinks = links?.filter(link => {
    if (res === "Admin" || res === "Moderator") {
      return link.path !== "/dashboard/admin/control/Rev-sales";
    }
    if (res === "Sales") {
      return link.path === "/dashboard/admin/control/Rev-sales"; 
    }
    return false;
  });
  
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

  const logoutLink = {
    path: "#",
    label: "Logout",
    icon: <CiLogin className="icon" />,
    onClick: handleLogOut
  };

  return (
    <div className="dashboard-layout">
        <div className={`${sidebar&&"overlay-dashboard"}`}></div>
      <aside className={`sidebar ${sidebar&&"small-sidebar"}`}>
        <h2 className="sidebar-heading">
            <img className="logo" src={logo} />
            <p>M&R SHOP</p>
        </h2>
        <nav className="sidebar-nav">
        <ul>
  {filteredLinks.map((link) => (
    <li className={getLinkClass(link.path)} key={link.path}>
      <Link to={link.path} onClick={toggleSideBarMobile}>
        {link.icon}
        <p>{link.label}</p>
      </Link>
    </li>
  ))}  
  <li>
    <Link onClick={logoutLink.onClick} className="logout-button">
      {logoutLink.icon}
      <p>{logoutLink.label}</p>
    </Link>
  </li>
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
