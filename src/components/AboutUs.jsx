import  { memo } from "react";
import TitleSection from "../Shared/TitleSection";
import "../Style/AboutUs.css";  
import { useShowAboutQuery } from "../app/Api/AboutUs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { data: about, isLoading, error } = useShowAboutQuery();
  const { i18n } = useTranslation();

  if(about?.about?.data?.length === 0)return null;
  if(error)return null;

  return (
    <div className="about-us-container">
      <TitleSection title={i18n.language === 'EN' ? "About Us" : "معلومات عنا"} />
      
      {isLoading ? (
        <div className="about-us-content">
          <div className="about-us-left">
            <Skeleton height="00px" width="100%" />
          </div>
          <div className="about-us-right">
            <Skeleton width="60%" height="30px" style={{ marginBottom: "15px" }} />
            <Skeleton width="80%" height="20px" style={{ marginBottom: "5px" }} />
            <Skeleton width="90%" height="20px" style={{ marginBottom: "5px" }} />
            <Skeleton width="90%" height="20px" style={{ marginBottom: "5px" }} />
            <Skeleton width="90%" height="20px" style={{ marginBottom: "5px" }} />
            <Skeleton width="90%" height="20px" style={{ marginBottom: "5px" }} />
            <Skeleton width="90%" height="20px" style={{ marginBottom: "5px" }} />
            <Skeleton width="90%" height="20px" style={{ marginBottom: "5px" }} />
          </div>
        </div>
      ) : (
        about?.about?.data?.map((about, index) => (
          <div className="about-us-content" key={index}>
            <div className="about-us-left">
              <img
                src={about?.image}
                alt="About Us"
                className="about-us-image"
              />
            </div>
            <div className="about-us-right">
              <h2>{about?.tittle}</h2>
              <p>{about?.desc}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default memo(AboutUs);
