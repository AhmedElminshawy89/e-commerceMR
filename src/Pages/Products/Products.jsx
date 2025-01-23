import BannerPage from "../../Shared/BannerPage"
import products from '../../assets/Img/banner2.avif'
import WholeProducts from "../../components/WholeProducts"
const ProductsPage = () => {
  return (
    <>
      <BannerPage pageTitle={'Products'} image={products}/>
      <WholeProducts/>
    </>
  )
}

export default ProductsPage
