import { useParams } from "react-router-dom"
import BannerPage from "../../Shared/BannerPage"
import products from '../../assets/Img/banner2.avif'
import ProductDetailsInfo from "../../components/ProductDetailsInfo"
const ProductsDetails = () => {
  const name = useParams()

  return (
    <>
      <BannerPage pageTitle={name?.name} image={products}/>
      <ProductDetailsInfo/>
    </>
  )
}

export default ProductsDetails
