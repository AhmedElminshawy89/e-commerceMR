import "../Style/Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section company-info">
          <h3 className="footer-title">M&R For Trading</h3>
          <p>Your trusted partner for quality products and services.</p>
          <p>1234 Street Name, City, State, 56789</p>
          <p>Email: support@company.com</p>
          <p>Phone: +1 (234) 567-8901</p>
        </div>

        <div className="footer-section quick-links">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="footer-section newsletter">
          <h3 className="footer-title">Subscribe to Our Newsletter</h3>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button"><IoIosSend/></button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 M&R FOR Trading. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
