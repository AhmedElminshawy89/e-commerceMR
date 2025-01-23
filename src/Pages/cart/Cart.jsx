import BannerPage from "../../Shared/BannerPage"
import cart from '../../assets/Img/cart.webp';
import ShoppingCart from "../../components/ShoppingCart";

const Cart = () => {
  return (
    <>
      <BannerPage pageTitle={"Cart"} image={cart} />
      <ShoppingCart/>
    </>
  )
}

export default Cart
