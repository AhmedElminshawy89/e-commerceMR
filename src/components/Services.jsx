import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useShowServicesQuery } from '../app/Api/Services';
import TitleSection from '../Shared/TitleSection';
import '../Style/Services.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Services = () => {
  
  const { data: service, isLoading, error } = useShowServicesQuery();
  const { i18n } = useTranslation();

  if(service?.services?.data?.length === 0) return null;
  if(error) return null;
  return (
    <div className="ser-sec-cont">
      <div className="services-section">
        <TitleSection title={i18n.language === 'EN' ? 'Our Services' : 'خدماتنا'} />
        <div className="services-container">
          {isLoading ? (
            Array(4).fill().map((_, index) => (
              <div className="service-card" key={index}>
                <div className="service-card-image">
                  <Skeleton height={250} width="100%" />
                </div>
                <div className="service-card-content">
                  <Skeleton width="60%" height={30} style={{ marginBottom: '15px' }} />
                  <Skeleton width="80%" height={20} />
                </div>
              </div>
            ))
          ) : (
            service?.services?.data.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-card-image">
                  <img
                    src={service.image}
                    alt={service.tittle}
                    className="service-image"
                  />
                </div>
                <div className="service-card-content">
                  <h3 className="service-name">{service.tittle}</h3>
                  <p className="service-description">{service.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Services);
