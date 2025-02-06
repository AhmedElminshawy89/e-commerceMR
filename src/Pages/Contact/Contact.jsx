import { useTranslation } from "react-i18next"
import BannerPage from "../../Shared/BannerPage"
import { useShowAllAdminImageBannersQuery } from "../../app/Api/SiteDetails"
import ContactUs from '../../components/ContactUs'
const Contact = () => {
  const {data} = useShowAllAdminImageBannersQuery()
  const {i18n} = useTranslation()
  return (
    <>
      <BannerPage pageTitle={i18n.language==="EN"?'Contact us':"تواصل معنا"} image={data?.imageBanner?.map((e)=>e.contact)}/>
      <ContactUs/>
    </>
  )
}

export default Contact
