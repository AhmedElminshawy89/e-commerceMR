import { useTranslation } from "react-i18next"
import BannerPage from "../../Shared/BannerPage"
import WholeProducts from "../../components/WholeProducts"
import { useShowAllAdminImageBannersQuery } from "../../app/Api/SiteDetails"
const ProductsPage = () => {
  const {i18n} = useTranslation()
  const {data} = useShowAllAdminImageBannersQuery()
  return (
    <>
      <BannerPage pageTitle={i18n.language==="EN"?'Products':"المنتجات"} image={data?.imageBanner?.map((e)=>e.product)}/>
      <WholeProducts/>
    </>
  )
}

export default ProductsPage
