import "../Style/Features.css";
import { useShowFeatureQuery } from "../app/Api/Feature";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Features = () => {
  const { data: featuresData, isLoading, error } = useShowFeatureQuery();

  if (featuresData?.feature?.data?.length === 0) return null;
  if (error) return null;

  return (
    <div className="feature">
      <div className="features-container">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div className="feature-box" key={index}>
                <div className="featureIcon-container">
                  <Skeleton circle width={50} height={50} />
                </div>
                <div className="feature-content">
                  <h3>
                    <Skeleton width={150} />
                  </h3>
                  <p>
                  <Skeleton width={220} />
                  <Skeleton width={100} />
                  </p>
                </div>
              </div>
            ))
          : featuresData?.feature?.data.map((feature, index) => (
              <div className="feature-box" key={index}>
                <div className="featureIcon-container">
                  <img
                    src={feature.image}
                    loading="lazy"
                    alt=""
                    style={{ width: "50px", height: "50px", borderRadius: "50px" }}
                  />
                </div>
                <div className="feature-content">
                  <h3>{feature.tittle}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Features;
