import "../Style/WhyUsSection.css";
import { FaRegDotCircle } from "react-icons/fa";

const WhyUsSection = () => {
  return (
    <section className="why-us-section">
      <div className="why-us-content">
        <h2 className="why-us-title">Why Us?</h2>
        <p className="why-us-description">
          We provide innovative solutions and high-quality services that meet all your needs. Choose us because we are the best in the market!
        </p>
        <ul className="why-us-list">
          <li><FaRegDotCircle/>Excellent customer service available 24/7.</li>
          <li><FaRegDotCircle/>Competitive pricing for all budgets.</li>
          <li><FaRegDotCircle/>Guaranteed quality in all products and services.</li>
          <li><FaRegDotCircle/>A professional team with years of experience.</li>
          <li><FaRegDotCircle/>We offer customized solutions tailored to your individual needs.</li>
        </ul>
      </div>
      <div className="why-us-images">
        <div className="why-us-image"></div>
        <div className="why-us-image"></div>
      </div>
    </section>
  );
};

export default WhyUsSection;
