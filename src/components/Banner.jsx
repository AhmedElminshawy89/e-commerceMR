import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "../Style/Banner.css";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import wave from "../assets/Img/header-waves.svg";

import banner1 from '../assets/Img/banner2.avif'
import banner2 from "../assets/Img/banner.webp"
import banner3 from "../assets/Img/banner3.webp"

const Banner = () => {
  const slidesData = [
    {
      img: banner1,
      title: "Unmissable Winter Discounts",
      description:
        "Gear up for the winter season with unbeatable deals on jackets, coats, and cozy winter pants. Enjoy high-quality products at competitive prices. Shop now and get free delivery on large orders!",
      buttonText: "Discover More",
    },
    {
      img: banner2,
      title: "Winter Specials",
      description:
        "Enjoy massive discounts of up to 50% on all winter products. Get the best clothing, footwear, and accessories to stay warm and stylish during the chilly season. Offers are valid for a limited time only—don’t miss out!",
      buttonText: "Shop Now",
    },
    {
      img: banner3,
      title: "Exclusive Winter Offers",
      description:
        "Upgrade your wardrobe with the latest winter fashion trends. Don't miss out on our limited-time offers on premium winter collections. Free shipping available!",
      buttonText: "Learn More",
    },
  ];

  return (
    <div className="banner-container">
      <img src={wave} alt="" className="wave-banner" />
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop
        effect="fade"
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        style={{ height: "600px" }}
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="banner-slide">
              <img
                src={slide.img}
                alt={slide.title}
                className="banner-image"
              />
              <div className="overlay">
                <div className="banner-content fade-in">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <button className="banner2-button">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
