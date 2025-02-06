/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import '../Style/BannerPage.css';

const BannerPage = ({ image, pageTitle }) => {
  const {i18n} = useTranslation()
  return (
    <div className="banner-page" style={{ backgroundImage: `url(${image})` }}>
      <div className="overlay"></div>
      <div className="banner-content">
        <h1>{pageTitle}</h1>
        <p>
          <a href="/" className="breadcrumb">{i18n.language==="EN"?"Home":"الصفحه الرئيسيه"}</a> / {pageTitle}
        </p>
      </div>
    </div>
  );
};

export default BannerPage;
