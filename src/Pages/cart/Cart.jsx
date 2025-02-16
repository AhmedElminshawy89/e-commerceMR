import { useTranslation } from "react-i18next";
import BannerPage from "../../Shared/BannerPage"
import cart from '../../assets/Img/cart.webp';
import ShoppingCart from "../../components/ShoppingCart";

const Cart = () => {
  const {i18n} = useTranslation()
  return (
    <>
      <BannerPage pageTitle={i18n.language==="EN"?"Cart":"عربيه التسوق"} image={cart} />
      <ShoppingCart/>
    </>
  )
}

export default Cart
