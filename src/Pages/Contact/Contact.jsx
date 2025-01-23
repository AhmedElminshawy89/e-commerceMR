import BannerPage from "../../Shared/BannerPage"
import contact from '../../assets/Img/contact.webp'
import ContactUs from '../../components/ContactUs'
const Contact = () => {
  return (
    <>
      <BannerPage pageTitle={'Contact us'} image={contact}/>
      <ContactUs/>
    </>
  )
}

export default Contact
