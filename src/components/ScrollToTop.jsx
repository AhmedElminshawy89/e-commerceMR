import { useEffect, useState } from "react";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";
import { useShowAllAdminOverAllInfoQuery } from "../app/Api/SiteDetails";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: Info} = useShowAllAdminOverAllInfoQuery();

  useEffect(() => {
    window.scrollTo(0, 0);

    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttonStyle = {
    position: "fixed",
    bottom: "105px",
    right: "20px", 
    backgroundColor: "var(--mint-green)",
    color: "white",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    cursor: "pointer",
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:'111111111111',
    border:'none'
  };

  const whatsappStyle = {
    position: "fixed",
    bottom: "60px", 
    right: "20px", 
    backgroundColor: "#25D366", 
    color: "white",
    borderRadius: "50%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:'111111111111'
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={buttonStyle}
        >
          <FaArrowUp size={20} />
        </button>
      )}
      <a
        href={`https://wa.me/${Info?.info?.map((e)=>e?.whatsUp)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={whatsappStyle}
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
};

export default ScrollToTop;
