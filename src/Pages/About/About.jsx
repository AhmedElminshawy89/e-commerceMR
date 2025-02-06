import { useTranslation } from "react-i18next";
import BannerPage from "../../Shared/BannerPage";
import { useShowAllAdminImageBannersQuery } from "../../app/Api/SiteDetails";
import AboutUs from "../../components/AboutUs";
import Banner2 from "../../components/Banner2";
import ContactBanner from "../../components/BannerContact";
import Features from "../../components/Features";
import Services from "../../components/Services";
import WhyUsSection from "../../components/WhyUsSection";

const About = () => {
  const {data} = useShowAllAdminImageBannersQuery()
  const {i18n} = useTranslation()

  return (
    <>
      <BannerPage pageTitle={i18n.language==="EN"?"About us":"ماذا عنا"} image={data?.imageBanner?.map((e)=>e.about)} />
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
