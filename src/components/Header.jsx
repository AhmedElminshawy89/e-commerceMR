import { FaWindowClose } from "react-icons/fa"; 
import { Link, useLocation } from "react-router-dom";
import "../Style/Header.css";
import logo from '../assets/Img/logo.jpg';
import { useState } from "react";
import { GiNestedHearts } from "react-icons/gi";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); 

  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuVisible(prev => !prev); 
  };

  return (
    <header>
      <div className="header-container">
        
        <Link to={'/'} className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <p className="site-link"><span className="special-color">M&R </span>For Trading</p>
        </Link>
<span className="heart-icon"><GiNestedHearts/></span>
        <div className={`header-links ${isMenuVisible ? 'show' : ''}`}>
          <Link to="/" className={`header-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
          <Link to="/product" className={`header-link ${location.pathname === "/product" ? "active" : ""}`}>Products</Link>
          <Link to="/about" className={`header-link ${location.pathname === "/about" ? "active" : ""}`}>About</Link>
          <Link to="/contact" className={`header-link ${location.pathname === "/contact" ? "active" : ""}`}>Contact</Link>
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
                <p className="site-link"><span className="special-color">M&R </span>For Trading</p>
              </div>
              <p onClick={toggleMenu} style={{cursor:'pointer' , padding:'0 15px'}}><FaWindowClose /></p>
            </div>
            <div className="mobile-links">
              <Link to="/" className={`mobile-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
              <Link to="/product" className={`mobile-link ${location.pathname === "/product" ? "active" : ""}`}>Products</Link>
              <Link to="/about" className={`mobile-link ${location.pathname === "/about" ? "active" : ""}`}>About</Link>
              <Link to="/contact" className={`mobile-link ${location.pathname === "/contact" ? "active" : ""}`}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
