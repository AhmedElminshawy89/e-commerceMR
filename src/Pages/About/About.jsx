import BannerPage from "../../Shared/BannerPage";
import aboutus from '../../assets/Img/aboutus.webp';
import AboutUs from "../../components/AboutUs";
import Banner2 from "../../components/Banner2";
import ContactBanner from "../../components/BannerContact";
import Features from "../../components/Features";
import Services from "../../components/Services";
import WhyUsSection from "../../components/WhyUsSection";

const About = () => {
  return (
    <>
      <BannerPage pageTitle={"About us"} image={aboutus} />
      <AboutUs />
      <WhyUsSection />
      <Services />
      <Banner2 />
      <ContactBanner />
      <Features />
    </>
  );
};

export default About;
