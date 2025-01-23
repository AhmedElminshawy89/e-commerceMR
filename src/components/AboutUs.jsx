import TitleSection from "../Shared/TitleSection";
import "../Style/AboutUs.css";  
import about from '../assets/Img/about.webp'
const AboutUs = () => {
  return (
    <div className="about-us-container">
    <TitleSection title='About Us'/>  
      <div className="about-us-content">
        <div className="about-us-left">
          <img src={about} alt="About Us" className="about-us-image" />
        </div>
        <div className="about-us-right">
          <h2>M&R For Trading</h2>
          <p>
            At <span className="special-color">M&R For Trading</span>, we strive to provide the best products and services to our valued customers. 
            We aim to offer unique experiences at competitive prices. We are here to meet your needs with a wide range of high-quality products and excellent services.
          </p>
          <p>
            Our team is professional and highly experienced, and we are committed to delivering the best for our customers at all times.
          </p>
          <p>
            Get in touch with us now to learn more about our premium products and services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
