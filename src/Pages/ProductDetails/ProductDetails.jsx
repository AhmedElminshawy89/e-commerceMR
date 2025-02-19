import { useParams } from "react-router-dom"
import BannerPage from "../../Shared/BannerPage"
import products from '../../assets/Img/banner2.avif'
import ProductDetailsInfo from "../../components/ProductDetailsInfo"
import { useShowSingleProductQuery } from "../../app/Api/Product"
const ProductsDetails = () => {
  const name = useParams()
  const { data } = useShowSingleProductQuery(name?.name)
  return (
    <>
      <BannerPage pageTitle={name?.name} image={data?.data?.product?.image}/>
      <ProductDetailsInfo/>
    </>
  )
}

export default ProductsDetails
