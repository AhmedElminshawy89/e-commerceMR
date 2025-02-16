/* eslint-disable react/prop-types */
import { message, Rate, Spin, Modal, Select, InputNumber } from "antd"
import { Link } from "react-router-dom"
import { FaCartPlus } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import { useAddToCartMutation, useShowCartQuery } from "../app/Api/Cart";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCartLength } from "../app/cartSlice";

const ProductCard = ({ product }) => {
  const { i18n } = useTranslation()
  const token = document.cookie.split('; ')?.find(row => row?.startsWith('token='))?.split('=')[1];
  const [addToCart, { isLoading: loadingCart }] = useAddToCartMutation()

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const {refetch} = useShowCartQuery();
  const dispatch = useDispatch();
// const cartLength = useSelector((state) => state.cart.cartLength);
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      message.error(i18n.language === "EN" ? "Please choose the color and size!" : "يرجى اختيار اللون والمقاس!");
      return;
    }
    if (Number(product?.stock || 0) < (quantity || 0)) {
      message.error(
        i18n.language === "EN"
          ? "Not enough stock for this product!"
          : "لا يوجد مخزون كافٍ لهذا المنتج!"
      );
      return;
    }
    

    if (!token) {
      const cartData = {
        product_id: product?.id,
        product_name: product?.name,
        product_price: product?.price_discount,
        color: selectedColor,
        size: selectedSize,
        quantity,
      };
      
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      
      const existingIndex = cart.findIndex(
        (item) =>
          item.product_id === cartData.product_id &&
          item.color === cartData.color &&
          item.size === cartData.size
      );
      
      if (existingIndex !== -1) {
        cart[existingIndex].quantity += cartData.quantity;
      } else {
        cart.push(cartData);
      }
      
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(setCartLength(cart.length));      

      message.success(i18n.language === "EN" ? "Item added to cart successfully!" : "تمت إضافة العنصر إلى السلة بنجاح!");
    } else {
      const ProductId = product?.id;
      await addToCart({
        id: ProductId,
        cartData: {
          color: selectedColor,
          size: selectedSize,
          quantity,
        },
      });
      refetch();
      message.success(i18n.language === "EN" ? "Added to cart successfully!" : "تمت الإضافة إلى السلة بنجاح!");
    }
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const calcDis = Math.round(((Number(product.main_price) - Number(product.price_discount)) / Number(product.main_price)) * 100);
  
  return (
    <>
      <Link to={`/product/${product?.name}`} key={product.id} className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3>{product.name}</h3>
          <div className="product-rating">
            <Rate disabled defaultValue={product.average_rating === 0 ? 1 : product.average_rating} />
          </div>
          <p className="product-description">
  {product.desc.length > 100 ? `${product.desc.slice(0, 100)}...` : product.desc}
</p>
          <div className="price-section">
            <span className="original-price">{product.main_price}</span>
            <span className="discounted-price">{product.price_discount}</span>
            <span className="calcDis-price">{calcDis}%</span>
          </div>

          <Link onClick={handleOpenModal} className="view-details-link" title={i18n.language === 'EN' ? "Add to cart" : "أضف إلى السلة"}>
            {loadingCart ? <Spin size="small" /> : <FaCartPlus />}
          </Link>
          <div className="card-footer">
            <div className="product-sizes">
              {product.sizes.join(", ")}
            </div>
            <div className="color-container">
              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className="color-box"
                  style={{ backgroundColor: color }}
                  title={color}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <Modal
        title={i18n.language === 'EN' ? 'Choose Options' : 'اختر الخيارات'}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onOk={handleAddToCart}
        okText={
          loadingCart ? <Spin /> : i18n.language === 'EN' ? 'Add to cart' : 'أضف إلى السلة'
        }
              >
        <div className="modal-content">
          <div className="modal-field">
            <span>{i18n.language === 'EN' ? 'Color' : 'اللون'}</span>
            <Select
  value={selectedColor}
  onChange={setSelectedColor}
  style={{ width: '100%' }}
  placeholder={i18n.language === 'EN' ? 'Select Color' : 'اختر اللون'}
>
  {product.colors.map((color, index) => (
    <Select.Option key={index} value={color}>
      <div 
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: color,
          borderRadius: '50%',
          display: 'inline-block',
          marginRight: '8px',
        }} 
      />
    </Select.Option>
  ))}
</Select>

          </div>

          <div className="modal-field">
            <span>{i18n.language === 'EN' ? 'Size' : 'المقاس'}</span>
            <Select
              value={selectedSize}
              onChange={setSelectedSize}
              style={{ width: '100%' }}
              placeholder={i18n.language === 'EN' ? 'Select Size' : 'اختر المقاس'}
            >
              {product.sizes.map((size, index) => (
                <Select.Option key={index} value={size}>
                  {size}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="modal-field">
            <span>{i18n.language === 'EN' ? 'Quantity' : 'الكمية'}</span>
            <InputNumber
              min={1}
              value={quantity}
              onChange={setQuantity}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ProductCard
