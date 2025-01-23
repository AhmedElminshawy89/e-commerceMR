import { FaTruck, FaLock, FaShieldAlt } from "react-icons/fa";
import "../Style/Features.css";

const featuresData = [
  {
    icon: <FaTruck className="feature-icon" />,
    title: "Free Delivery",
    description: "Enjoy free shipping on all orders, no minimum required.",
  },
  {
    icon: <FaLock className="feature-icon" />,
    title: "100% Secure Payment",
    description: "Your payments are secured with advanced encryption.",
  },
  {
    icon: <FaShieldAlt className="feature-icon" />,
    title: "Quality Guarantee",
    description: "We guarantee the highest quality for all our products.",
  },
];

const Features = () => {
  return (
    <div className="feature">
      <div className="features-container">
        {featuresData.map((feature, index) => (
          <div className="feature-box" key={index}>
            <div className="featureIcon-container">
            {feature.icon}
            </div>
            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
