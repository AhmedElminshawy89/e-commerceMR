import "../Style/ContactBanner.css";
import { GiBowTieRibbon } from "react-icons/gi";

const ContactBanner = () => {
  return (
    <div className="contact-banner-container">
      <p className="contact-icon"><GiBowTieRibbon/></p>
      <div className="contact-banner-content">
        <h2 className="contact-banner-title">Contact Us Today!</h2>
        <p className="contact-banner-description">
          We&apos;re here to help with any questions or support you may need. Reach out to us now!
        </p>
        <button
        className="contact-button"
          onClick={() => alert('Redirecting to contact page...')}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ContactBanner;
