import { FaWindowClose } from "react-icons/fa"; 
import { useLocation, useNavigate } from "react-router-dom";
import "../Style/Header.css";
import logo from '../assets/Img/logo.jpg';
import { useState } from "react";
import { GiNestedHearts } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); 
  const {t} = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuVisible(prev => !prev); 
  };

  const navigateWithRef = (path) => {
    const storedRef = localStorage.getItem('ref'); 
    const url = storedRef ? `${path}?ref=${storedRef}` : path;

    navigate(url);
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo-container" onClick={() => navigateWithRef('/')}>
          <img src={logo} alt="Logo" className="logo" />
          <p className="site-link">{t('logoName')}</p>
        </div>
        <span className="heart-icon"><GiNestedHearts/></span>
        
        <div className={`header-links ${isMenuVisible ? 'show' : ''}`}>
          <div onClick={() => navigateWithRef("/")} className={`header-link ${location.pathname === "/" ? "active" : ""}`}>{t('Home')}</div>
          <div onClick={() => navigateWithRef("/product")} className={`header-link ${location.pathname === "/product" ? "active" : ""}`}>{t('Products')}</div>
          <div onClick={() => navigateWithRef("/about")} className={`header-link ${location.pathname === "/about" ? "active" : ""}`}>{t('About')}</div>
          <div onClick={() => navigateWithRef("/contact")} className={`header-link ${location.pathname === "/contact" ? "active" : ""}`}>{t('Contact')}</div>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <span className={isMenuVisible ? "hide" : "show"}>☰</span>
        </div>

        {isMenuVisible && <div className="mobile-overlay show" onClick={toggleMenu}></div>}
        {isMenuVisible && (
          <div className="mobile-menu show">
            <div className="flex-between border-bottom">
              <div className="website-name">
                <img src={logo} alt="M&R Shop" />
                <p className="site-link">{t('logoName')}</p>
              </div>
              <p onClick={toggleMenu} style={{cursor:'pointer' , padding:'0 15px'}}><FaWindowClose /></p>
            </div>
            <div className="mobile-links">
              <div onClick={() => navigateWithRef("/")} className={`mobile-link ${location.pathname === "/" ? "active" : ""}`}>{t('Home')}</div>
              <div onClick={() => navigateWithRef("/product")} className={`mobile-link ${location.pathname === "/product" ? "active" : ""}`}>{t('Products')}</div>
              <div onClick={() => navigateWithRef("/about")} className={`mobile-link ${location.pathname === "/about" ? "active" : ""}`}>{t('About')}</div>
              <div onClick={() => navigateWithRef("/contact")} className={`mobile-link ${location.pathname === "/contact" ? "active" : ""}`}>{t('Contact')}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
