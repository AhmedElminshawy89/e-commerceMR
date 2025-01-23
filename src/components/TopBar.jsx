import { useState } from "react";
import { FaEnvelope, FaGlobe, FaPhoneAlt, FaUser, FaShoppingCart } from "react-icons/fa";
import "../Style/TopBar.css"; 
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";



const TopBar = () => {
  const [language, setLanguage] = useState("EN");
  const { i18n } = useTranslation();


  const toggleLanguage = () => {
    const newLanguage = language === "EN" ? "AR" : "EN"; 
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <>
      <div className="top-bar">
        <div className="contact-group">
          <div className="contact-item">
            <FaEnvelope />
            <span>info@example.com</span>
          </div>
          <p className="separator"></p>
          <div className="contact-item">
            <FaPhoneAlt />
            <span>{language === "EN" ? "+1-234-567-890" : "+1-234-567-890"}</span>
          </div>
        </div>
        <div className="top-bar-right">
                    <button className="language-toggle" onClick={toggleLanguage}>
            <FaGlobe />
            <span>{language}</span>
          </button>
          <p className="separator"></p>
          <Link to={'/login'} className="icon-group">
            <div className="icon-container">
              <FaUser className="icon"/>
            </div>
          </Link>
        <p className="separator"></p>
            <Link to={'/cart'} className="icon-container">
              <FaShoppingCart className="icon"/>
              <p>9</p>
            </Link>
        </div>
      </div>
    </>
  );
};

export default TopBar;
