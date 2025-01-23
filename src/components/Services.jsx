import TitleSection from '../Shared/TitleSection';
import '../Style/Services.css';
const Services = () => {
  const services = [
    {
      name: "Clothing Coordination Service",
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/pexels-ron-lach-9196736-1024x852.jpg",
      description: "Professional clothing coordination with the latest trends."
    },
    {
      name: "Fashion Consultation Service",
      image: "https://shopo.quomodothemes.website/assets/images/product-img-24.jpg", 
      description: "Personalized consultation to help you choose the perfect outfits."
    },
    {
      name: "Clothing Alteration Service",
      image: "https://shopo.quomodothemes.website/assets/images/product-img-24.jpg",
      description: "Alterations and tailoring for a perfect fit."
    },
    {
      name: "Clothing Cleaning Service",
      image: "https://shopo.quomodothemes.website/assets/images/product-img-24.jpg",
      description: "High-quality cleaning to maintain the longevity of your clothes."
    }
  ];

  return (
    <div className="ser-sec-cont">
      <div className="services-section">
        <TitleSection title='Our Services'/> 
        <div className="services-container">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-card-image">
                <img src={'https://debebe.vamtam.com/wp-content/uploads/2022/06/pexels-ron-lach-9196736-1024x852.jpg'} alt={service.name} className="service-image" />
              </div>
              <div className="service-card-content">
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
