import { useEffect, useState } from "react";
import { FaEnvelope, FaGlobe, FaPhoneAlt, FaUser, FaShoppingCart } from "react-icons/fa";
import { Menu, Dropdown } from "antd"; 
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useShowCartQuery } from "../app/Api/Cart";
import "../Style/TopBar.css"; 
import { useShowSingleUserQuery } from "../app/Api/Users";
import { useShowAllAdminOverAllInfoQuery } from "../app/Api/SiteDetails";

const TopBar = () => {
  const lang = localStorage.getItem("userLanguage")
  const [language, setLanguage] = useState(lang);
  const { i18n } = useTranslation();
  const [cartCount, setCartCount] = useState(0);
  const { data } = useShowCartQuery();
  const navigate = useNavigate();
  const { data: SingleUser} = useShowSingleUserQuery();
  const { data: Info} = useShowAllAdminOverAllInfoQuery();
  const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

  useEffect(() => {
    if (data?.data?.cartItems) {
      setCartCount(data.data.cartItems.length);
    }
  }, [data]);

  const toggleLanguage = () => {
    const newLanguage = language === "EN" ? "AR" : "EN"; 
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    window.location.reload();
  };

  const navigateWithRef = (path) => {
    const storedRef = localStorage.getItem("ref"); 
    const url = storedRef ? `${path}?ref=${storedRef}` : path;
    navigate(url);
  };

  const menu = (
    <Menu>
      <Menu.Item key="username" style={{width:'120px'}}>
        <p>{SingleUser?.user?.name}</p>
      </Menu.Item>
      <Menu.Item key="profile">
        <Link to="/my-account">{i18n.language==="EN"?"My Profile":"الملف الشخصي"} </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
      }}>
        {i18n.language==="EN"?"Log out":"تسجيل الخروج"}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="top-bar">
      <div className="contact-group">
      {Info?.info?.length !== 0 && (
  <>
    <div className="contact-item">
      <FaEnvelope />
      <span>
        {Info?.info?.map((e, index) => (
          <a key={index} href={`mailto:${e.email}`} style={{ textDecoration: "none", color: "inherit" }}>
            {e.email}
          </a>
        ))}
      </span>
    </div>
    <p className="separator"></p>
    <div className="contact-item">
      <FaPhoneAlt />
      <span>
      {Info?.info?.map((e, index) => (
  <a key={index} href={`tel:${e.phone}`} target="_self" style={{ textDecoration: "none", color: "inherit" }}>
    {e.phone}
  </a>
))}

      </span>
    </div>
  </>
)}

      </div>

      <div className="top-bar-right">
        <button className="language-toggle" onClick={toggleLanguage}>
          <FaGlobe />
          <span>{language}</span>
        </button>
        <p className="separator"></p>

        {!token ? (
          <Link to={"/login"} className="icon-group">
            <div className="icon-container">
              <FaUser className="icon"/>
            </div>
          </Link>
        ) : (
          <Dropdown overlay={menu} placement="bottomRight">
            <div className="icon-container" style={{ cursor: "pointer" }}>
              <img 
                src={SingleUser?.user?.image ===''?"https://cdn-icons-png.flaticon.com/512/3177/3177440.png" :SingleUser?.user?.image}
                alt="User Avatar" 
                className="avatar"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            </div>
          </Dropdown>
        )}
        
        <p className="separator"></p>

        <div onClick={() => navigateWithRef("/cart")} className="icon-container">
          <FaShoppingCart className="icon"/>
          <p>{cartCount}</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
