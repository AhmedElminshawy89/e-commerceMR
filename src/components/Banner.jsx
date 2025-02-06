import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../Style/Banner.css";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import wave from "../assets/Img/header-waves.svg";
import { useShowBannerLandQuery } from "../app/Api/Banner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 

const Banner = React.memo(() => {
  const { data: bannerData, isLoading, error } = useShowBannerLandQuery();

  if (bannerData?.banner?.length === 0) return null;
  if (error) return null;

  return (
    <div className="banner-container">
      {isLoading ? (
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
          style={{ height: "100vh" }}
        >
          <SwiperSlide>
            <div className="banner-slide">
              <Skeleton height="100%" />
              <div className="overlay">
                <div className="banner-content fade-in" style={{top:'20%'}}>
                  <Skeleton width="60%" height="30px" style={{marginBottom:"10px"}}/>
                  <Skeleton width="80%" height="80px" style={{marginBottom:"10px"}}/>
                  <Skeleton width="20%" height="40px" style={{marginBottom:"10px"}}/>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        <>
          <img src={wave} alt="" className="wave-banner" loading="lazy" />
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
            {bannerData?.banner.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="banner-slide">
                  <img
                    src={slide.image}
                    alt={slide.tittle}
                    loading="lazy"
                    className="banner-image"
                    srcSet={slide.image}
                    sizes="(max-width: 600px) 320px, 480px"
                  />
                  <div className="overlay">
                    <div className="banner-content fade-in">
                      <h2>{slide.tittle}</h2>
                      <p>{slide.desc}</p>
                      <button onClick={() =>  window.location.href = slide.link_btn} className="banner2-button">
                        {slide.name_btn}
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
});
Banner.displayName = "Banner";
export default Banner;
