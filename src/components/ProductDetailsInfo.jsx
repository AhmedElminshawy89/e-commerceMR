import { useNavigate, useParams } from "react-router-dom";
import "../Style/ProductDetailsInfo.css";
import TitleSection from "../Shared/TitleSection";
import ProductCard from "../Shared/ProductCard";
import { useState } from "react";
import { Rate, Form, Input, Button, message } from "antd";
import { useShowSingleProductQuery } from "../app/Api/Product";
import { useShowCategoryQuery } from "../app/Api/Categories";
import { useTranslation } from "react-i18next";
import { useSaveReviewMutation } from "../app/Api/Review";
import { useForm } from "antd/es/form/Form";
import { useAddToCartMutation, useShowCartQuery } from "../app/Api/Cart";
import { Spin } from 'antd'; 
import { useDispatch } from "react-redux";
import { setCartLength } from "../app/cartSlice";

const ProductDetailsInfo = () => {
  const { name } = useParams();
  const [currentTab, setCurrentTab] = useState(1);
  const { data , isLoading} = useShowSingleProductQuery(name)
  const {i18n} = useTranslation()
  const [form] = useForm(); 
  const navigate = useNavigate()

  const token = document.cookie.split('; ')?.find(row => row?.startsWith('token='))?.split('=')[1];

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); 

  const [ saveReview ,{isLoading:loadingReview}] = useSaveReviewMutation()
  const [ addToCart ,{isLoading:loadingCart}] = useAddToCartMutation()
  const {refetch} = useShowCartQuery();

  const [mainImage, setMainImage] = useState(
    data?.data?.product?.image
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase") {
      setQuantity(quantity + 1);
    }
  };
  const dispatch = useDispatch();
// const cartLength = useSelector((state) => state.cart.cartLength);

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubImageClick = (image) => {
    setMainImage(image);
  };


  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      message.error(i18n.language === "EN" ? "Please choose the color and size before adding to cart!" : "يرجى اختيار اللون والمقاس قبل الإضافة إلى السلة!");
      return;
    }
    if (Number(data?.data?.product?.stock || 0) < (quantity || 0)) {
      message.error(
        i18n.language === "EN"
          ? "Not enough stock for this product!"
          : "لا يوجد مخزون كافٍ لهذا المنتج!"
      );
      return;
    }
  
    if (!token) {
      const cartData = {
        product_id: data?.data?.product?.id,
        product_name: data?.data?.product?.name,
        product_price: data?.data?.product?.price_discount,
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
      const ProductId = data?.data?.product?.id;
      await addToCart({
        id: ProductId,
        cartData: {
          color: selectedColor,
          size: selectedSize,
          quantity,
        },
      });
      refetch()
      message.success(i18n.language === "EN" ? "Added to cart successfully!" : "تمت الإضافة إلى السلة بنجاح!");
    }
  };
  

  const onFinishReview = async (values) => {
    if(!token){
      message.error(i18n.language==="EN"?"You must log in first to submit your comments!":"يجب تسجيل الدخول أولا�� لتقديم تعليقاتك!");
      navigate('/login') 
      return;
    }
    const ProductId = data?.data?.product?.id;
    try {
      await saveReview({ id: ProductId, Review: values });
      message.success(i18n.language==="EN"?"Your review has been submitted successfully!":"لقد تم إرسال رأيك بنجاح!");
      form.resetFields();
    } catch (error) {
      message.error(i18n.language==="EN"?"There was an error submitting your review.":"حدث خطأ أثناء إرسال رأيك.");
      console.error("Error submitting review: ", error);
    }
  };
  

    const { data: categoryData } = useShowCategoryQuery();
  
    const categoryName = categoryData?.categories?.find(
      (category) => category.id === data?.data?.product?.category_id
    )?.[i18n.language === "EN" ? "name_en" : "name_ar"] || "";
    
  return (
    <div className="products-container-section">
      <div className="products-section">
        <div className="product-main">
          {isLoading ?<div style={{width:'100%',textAlign:'center'}}>
            <Spin size="large" />
          </div>:(
            <>
              <div className="product-images">
                <img
                  src={mainImage || data?.data?.product?.image}
                  alt="Main Product"
                  className="main-image"
                  onClick={handleImageClick}
                />
                {isModalOpen && (
                  <div className="modal" onClick={closeModal}>
                    <img
                      src={mainImage}
                      alt="Full Screen Product"
                      className="full-image"
                    />
                  </div>
                )}
                <div className="sub-images">
                {Array.isArray(data?.data?.product?.OtherImage) && data.data.product.OtherImage.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Sub ${index + 1}`}
        className="sub-image"
        onClick={() => handleSubImageClick(image)}
      />
    ))}

                </div>
              </div>
              <div className="product-info">
              <div className="cta-sec">
                      <span className="original-cta-details">{i18n.language==="EN"?"Category":"القسم"}:</span>
                      <span className="type-cta-details">{categoryName}</span>
                </div>  
                <div className="cta-sec">
                      <span className="original-cta-details">{i18n.language==="EN"?"Availability":"التوفر"} : </span>
                      <span className="type-cta-details">{ data?.data?.product?.stock > 0
        ? (i18n.language === "EN" ? "In stock" : "متوفر")
        : (i18n.language === "EN" ? "Not Available" : "غير متوفر")}</span>
                </div>   
                <h1 className="product-name">{name}</h1>
                <div className="product-rating">
                <Rate 
          disabled 
          defaultValue={
            data?.data?.average_rating 
              ? Math.max(1, data.data.average_rating) 
              : 1
          } 
        />                    <p>({data?.data?.review_count})</p>
                      </div>
                      <div className="product-description pt">
                        {data?.data?.product?.desc}
                      </div>
                      <div className="card-footer product-details-d">
                    <div className="product-sizes">
                      <strong>{i18n.language==="EN"?"Sizes":"المقاسات"}:</strong> 
                      {data?.data?.product?.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`ba-button ${selectedSize === size ? "selected" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                    </div>
                    <div className="color-selection">
                  <div className="color-container product-sizes">
                  <strong>{i18n.language==="EN"?"Colors":"الالوان"}:</strong>
                    {data?.data?.product?.colors.map((color, index) => (
                      <span
                        key={index}
                        className={`color-box ${selectedColor === color ? "selected" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      ></span>
                    ))}
                  </div>
                </div>
                    </div>
                <div className="price-section bt">
                <span className="discounted-price-details c">{i18n.language==="EN"?"Price":"السعر"} : </span>
                      <span className="original-price-details">{data?.data?.product?.main_price}$</span>
                      <span className="discounted-price-details"> {data?.data?.product?.price_discount}$</span>
                </div>       
                <div className="wrap-btn-quantity">
                    <div className="quantity">
                        <span onClick={()=>handleQuantityChange("decrease")}>-</span>
                        <span>{quantity}</span>
                        <span onClick={()=>handleQuantityChange("increase")}>+</span>
                    </div>
                    <div className="btns">
                    <button 
                      className="banner-button2" 
                      onClick={handleAddToCart} 
                      disabled={loadingCart} 
                    >
                      {loadingCart ? (
                        <Spin tip="..." />
                      ) : (
                        i18n.language === "EN" ? "Add to cart" : "اضافه الي السله"
                      )}
                    </button>
                    </div>
                </div>
              </div>
            </>
          ) }
        </div>
        {!isLoading && (
          <>
            <div className="remain-details">
                <div className="tabs">
                    <span onClick={()=>setCurrentTab(1)} className={`${currentTab===1&&"active"}`}>{i18n.language==="EN"?"Description":"الوصف"}
                    </span>
                    <span onClick={()=>setCurrentTab(3)} className={`${currentTab===3&&"active"}`}>{i18n.language==="EN"?"Additional Details":"تفاصيل إضافية"}</span>
                    <span onClick={()=>setCurrentTab(2)} className={`${currentTab===2&&"active"}`}>{i18n.language==="EN"?"Review":"تققيم"}</span>
                </div>
                {currentTab === 1 ?(
                    <div className="description">
                        <div className="product-description">
                          {data?.data?.product?.desc}
                        </div>
                    </div>
                ):currentTab === 2?(
                    <div className="review">
                    <TitleSection title={i18n.language==="EN"?"Leave a Review":"اترك التعليق"}/>
                    <Form
                    form={form}
                    name="reviewForm"
                    onFinish={onFinishReview}
                    layout="vertical"
                    className="review-form"
                    >
                    <Form.Item
                        name="rating"
                        label={i18n.language==="EN"?"Rating":"تقييم"}
                        rules={[{ required: true, message: i18n.language==="EN"?"Please provide a rating!":"يرجى تقديم تصنيف!" }]}
                    >
                        <Rate />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        label={i18n.language==="EN"?"Comment":"تعليق"}
                        rules={[{ required: true, message: i18n.language==="EN"?"Please write your comment!":"الرجاء كتابة تعليقك!" }]}
                    >
                        <Input.TextArea rows={4} placeholder={i18n.language==="EN"?"Write your review here...":"أكتب رأيك هنا..."} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="banner-button">
                        {loadingReview ? (
                          <Spin size="small" />
                        ) : (
                          i18n.language==="EN"?" Submit Review":"إرسال المراجعة"
                        )}
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
                ):(
    <div className="additional-details">
      <table className="details-table">
        <thead>
          <tr>
            <th>{i18n.language==="EN"?"Color":"اللون"}</th>
            <th>{i18n.language==="EN"?"Size":"المقاس"}</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.product?.colors.map((color, index) => (
            <tr key={index}>
              <td>
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: color,
                    display: "block",
                    margin: '0 auto',
                    borderRadius: '20px'
                  }}
                ></span>
              </td>
              <td>{data?.data?.product?.sizes[index] || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

                )}
            </div>
            <TitleSection title={i18n.language === 'EN' ? "Related Products" : "المنتجات ذات الصلة"}
                secTitle={i18n.language === 'EN' ? "View All" : "عرض الكل"} to="/products" />
            <div className="products-container">
              {data?.data?.related_products?.map((product, index) => (
                <ProductCard key={product?.id || index} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsInfo;
