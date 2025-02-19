import "../Style/Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useSaveSubscribeMutation } from "../app/Api/Contact";
import { useState } from "react";
import { message } from "antd";
import { useShowAllAdminOverAllInfoQuery, useShowAllAdminSocialQuery } from "../app/Api/SiteDetails";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [saveSubscribe, { isLoading }] = useSaveSubscribeMutation();
  const { data: Info} = useShowAllAdminOverAllInfoQuery();
  const { data: Social} = useShowAllAdminSocialQuery();

  const {t,i18n} = useTranslation()
  
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      message.warning(i18n.language === "EN" ?"Please enter a valid email address.":"يرجى إدخال عنوان بريد إلكتروني صالح.");
      return;
    }

    try {
      await saveSubscribe({ email }).unwrap();
      message.success(i18n.language==="EN"?"Subscription successful! Thank you for subscribing.":" تم الاشتراك بنجاح ! شكرا لك على الاشتراك.");
      setEmail("");
    } catch (error) {
      message.error(i18n.language==="EN"?"An error occurred while subscribing. Please try again later.":"حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى لاحقًا.");
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section company-info">
          <h3 className="footer-title">{t('logoName')}</h3>
          <p>{Info?.info?.map((e)=>(e?.desc))}</p>
          <p>{Info?.info?.map((e)=>(e?.address))}</p>
          <p>{i18n.language === "EN"?"Email:":"البريد الالكتروني:"}         {Info?.info?.map((e, index) => (
          <a key={index} href={`mailto:${e.email}`} style={{ textDecoration: "none", color: "inherit" }}>
            {e.email}
          </a>
        ))}</p>
          <p>{i18n.language === "EN"?"Phone:":"رقم الهاتف:"}        {Info?.info?.map((e, index) => (
  <a key={index} href={`tel:${e.phone}`} target="_self" style={{ textDecoration: "none", color: "inherit" }}>
    {e.phone}
  </a>
))}</p>
        </div>

        <div className="footer-section quick-links">
          <h3 className="footer-title">{i18n.language === "EN"?"Quick Links":"روابط سريعة"} </h3>
          <ul className="footer-links">
            <li><a href="#home">{t('Home')}</a></li>
            <li><a href="#about">{t('About')}</a></li>
            <li><a href="#services">{t('About')}</a></li>
            <li><a href="#contact">{t('Contact')}</a></li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h3 className="footer-title">{i18n.language === "EN"?"Follow Us":"تابعنا"} </h3>
          <div className="social-icons">
  {Social?.socialMedia?.find((e) => e.face)?.face && (
    <a href={Social.socialMedia.find((e) => e.face).face} className="social-icon">
      <FaFacebookF />
    </a>
  )}
  
  {Social?.socialMedia?.find((e) => e.twitter)?.twitter && (
    <a href={Social.socialMedia.find((e) => e.twitter).twitter} className="social-icon">
      <FaTwitter />
    </a>
  )}

  {Social?.socialMedia?.find((e) => e.insta)?.insta && (
    <a href={Social.socialMedia.find((e) => e.insta).insta} className="social-icon">
      <FaInstagram />
    </a>
  )}

  {Social?.socialMedia?.find((e) => e.linkedIn)?.linkedIn && (
    <a href={Social.socialMedia.find((e) => e.linkedIn).linkedIn} className="social-icon">
      <FaLinkedinIn />
    </a>
  )}
</div>

        </div>

        <div className="footer-section newsletter">
          <h3 className="footer-title">{i18n.language === "EN"?"Subscribe to Our Newsletter":"اشترك في النشرة الإخبارية لدينا:"} </h3>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder={i18n.language === "EN" ?"Enter your email":"أدخل بريدك الإلكتروني"}
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="newsletter-button" disabled={isLoading}>
              <IoIosSend />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy;{i18n.language === "EN"?" 2025 M&R SHOP. All rights reserved.":"2025 متجر إم آند آر. جميع الحقوق محفوظة."} </p>
      </div>
    </footer>
  );
};

export default Footer;
