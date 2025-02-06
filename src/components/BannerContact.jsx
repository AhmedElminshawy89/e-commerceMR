import { useShowContactUsQuery } from "../app/Api/ContactUsSec";
import "../Style/ContactBanner.css";
import { GiBowTieRibbon } from "react-icons/gi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ContactBanner = () => {
  const { data: ContactData, isLoading, error } = useShowContactUsQuery();
  
  if (ContactData?.contactUs?.data?.length === 0) return null;
  if (error) return null;

  return (
    <div className="contact-banner-container">
      <p className="contact-icon">
        <GiBowTieRibbon />
      </p>
      {isLoading ? (
        <div className="contact-banner-content">
          <Skeleton width={600} height={30} highlightColor="#33b6b5"/>
          <Skeleton count={3} highlightColor="#33b6b5" />
          <Skeleton width={150} height={40} highlightColor="#33b6b5"/>
        </div>
      ) : (
        ContactData?.contactUs?.data?.map((contact, idx) => (
          <div className="contact-banner-content" key={idx}>
            <h2 className="contact-banner-title">{contact.tittle}</h2>
            <p className="contact-banner-description">
              {contact.desc}
            </p>
            <button
              className="contact-button"
              onClick={() => (window.location.href = contact.link_btn)}
            >
              {contact.name_btn}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactBanner;
