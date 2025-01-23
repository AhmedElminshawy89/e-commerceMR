import "../Style/Banner2.css";

const Banner2 = () => {
  return (
    <div className="banner2-container banner-container">
      <div className="banner2-content">
        <h2 className="banner2-title">50% Off on All Products!</h2>
        <p className="banner2-description">Get amazing offers on selected products now. Hurry up before the offer ends!</p>
        <button className="banner2-button" onClick={() => alert('Redirecting to shop...')}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner2;
