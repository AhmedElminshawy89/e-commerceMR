/* eslint-disable react/prop-types */
import '../Style/BannerPage.css';

const BannerPage = ({ image, pageTitle }) => {
  return (
    <div className="banner-page" style={{ backgroundImage: `url(${image})` }}>
      <div className="overlay"></div>
      <div className="banner-content">
        <h1>{pageTitle}</h1>
        <p>
          <a href="/" className="breadcrumb">Home</a> / {pageTitle}
        </p>
      </div>
    </div>
  );
};

export default BannerPage;
