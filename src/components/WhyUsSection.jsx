import { useTranslation } from "react-i18next";
import { useShowWhyUsQuery } from "../app/Api/WhySection";
import "../Style/WhyUsSection.css";
import { Skeleton } from "antd"; 

const WhyUsSection = () => {
  const { data: why, error, isLoading } = useShowWhyUsQuery(); 
  
  if (error || (why?.why?.data?.length === 0)) return null;

  if (isLoading) {
    return (
      <section className="why-us-section">
        {[...Array(1)].map((_, index) => (
          <>
            <div className="why-us-content" key={index}>
              <Skeleton active title={false} paragraph={{ rows: 2 }} />
            </div>
            <div className="why-us-images">
              <Skeleton.Image style={{ width: 450, height: 250 }} />
            </div>
          </>
        ))}
      </section>
    );
  }

  return (
    <section className="why-us-section">
      {why?.why?.data?.map((why,index)=>(
        <>
          <div className="why-us-content" key={index}>
            <h2 className="why-us-title">{why.tittle}</h2>
            <p className="why-us-description">
             {why.desc}
            </p>
          </div>
          <div className="why-us-images">
            <div className="why-us-image" style={{ backgroundImage: `url(${why.image})` }}></div>
          </div>
        </>
      ))}
    </section>
  );
};

export default WhyUsSection;
