import { useParams } from "react-router-dom";
import "../Style/ProductDetailsInfo.css";
import TitleSection from "../Shared/TitleSection";
import ProductCard from "../Shared/ProductCard";
import { useState } from "react";
import { Rate, Form, Input, Button, message } from "antd";

const ProductDetailsInfo = () => {
  const { name } = useParams();
  const [currentTab, setCurrentTab] = useState(1);
  const products = [
    { 
      id: 5, 
      name: "Kids Hoodie", 
      description: "Comfortable hoodie for kids, available in multiple colors.", 
      originalPrice: "$40", 
      discountedPrice: "$35", 
      rating: 4,  
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/5643519108_6_1_1-420x525.jpeg",
      price: "$35",
      colors: ["#0000FF", "#808080", "#000000"],
      sizes: ["M", "L", "XL"]
    },
    { 
      id: 6, 
      name: "Kids Winter Jacket", 
      description: "Warm and stylish jacket for cold seasons Warm and stylish jacket for cold seasons.", 
      originalPrice: "$50", 
      discountedPrice: "$40", 
      rating: 4,  
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/2888664403_6_1_1-scaled-420x525.jpeg", 
      price: "$40",
      colors: ["#FFC0CB", "#ADD8E6", "#FFFFFF"],
      sizes: ["M", "L", "XL"]
    },
    { 
      id: 7, 
      name: "Toddler Sneakers", 
      description: "Durable and comfy sneakers for toddlers Durable and comfy sneakers for toddlers.", 
      originalPrice: "$30", 
      discountedPrice: "$25", 
      rating: 3,  
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/1-1-420x525.webp", 
      price: "$25",
      colors: ["#FFFFFF", "#000000", "#808080"],
      sizes: ["22", "24", "26"]
    },
    { 
      id: 8, 
      name: "Kids Winter Jacket", 
      description: "Warm and stylish jacket for cold seasons Warm and stylish jacket for cold seasons.", 
      originalPrice: "$50", 
      discountedPrice: "$40", 
      rating: 4,  
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/5644518505_6_1_1-420x525.jpg", 
      price: "$40",
      colors: ["#FF0000", "#000000", "#008000"],
      sizes: ["M", "L", "XL"]
    },
  ];
  const product = { 
      id: 5, 
      name: "Kids Hoodie", 
      description: "Comfortable hoodie for kids, available in multiple colors.", 
      originalPrice: "$40", 
      discountedPrice: "$35", 
      rating: 4,  
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/5643519108_6_1_1-420x525.jpeg",
      price: "$35",
      colors: ["#0000FF", "#808080", "#000000",'#514c4c'],
      sizes: ["M", "L", "XL"]
    }

  const [mainImage, setMainImage] = useState(
    "https://debebe.vamtam.com/wp-content/uploads/2022/06/2888664403_6_1_1-scaled-420x525.jpeg"
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
  

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubImageClick = (image) => {
    setMainImage(image);
  };

  const onFinishReview = (values) => {
    console.log("Review Submitted: ", values);
    message.success("Your review has been submitted successfully!");
  };

  return (
    <div className="products-container-section">
      <div className="products-section">
        <div className="product-main">
          <div className="product-images">
            <img
              src={mainImage}
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
              {[
                "https://debebe.vamtam.com/wp-content/uploads/2022/06/2888664403_6_1_1-scaled-420x525.jpeg",
                "https://debebe.vamtam.com/wp-content/uploads/2022/06/6224845703_6_2_1-420x525.jpg",
                "https://debebe.vamtam.com/wp-content/uploads/2022/06/2888664403_6_1_1-scaled-420x525.jpeg",
                "https://debebe.vamtam.com/wp-content/uploads/2022/06/7947504812_6_1_1-420x525.jpg",
              ].map((image, index) => (
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
                  <span className="original-cta-details">Category:</span>
                  <span className="type-cta-details">All</span>
            </div>  
            <div className="cta-sec">
                  <span className="original-cta-details">Availability : </span>
                  <span className="type-cta-details">In stock</span>
            </div>   
            <h1 className="product-name">{name +" | Babyhug Singlet Frock Rose" }</h1>
            <div className="product-rating">
                    <Rate disabled defaultValue={4} />
                    <p>(35)</p>
                  </div>
                  <div className="product-description pt">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quas consectetur fugit autem, quasi qui alias repellendus accusamus? Neque at quia impedit corporis accusamus explicabo ipsum deleniti! Molestias, eligendi doloribus!   
                  </div>
                  <div className="card-footer product-details-d">
                <div className="product-sizes">
                  <strong>Sizes:</strong> {product.sizes.join(", ")}
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
            <div className="price-section bt">
            <span className="discounted-price-details c">Price : </span>
                  <span className="discounted-price-details"> 100$</span>
                  <span className="original-price-details">150$</span>
            </div>       
            <div className="wrap-btn-quantity">
                <div className="quantity">
                    <span onClick={()=>handleQuantityChange("decrease")}>-</span>
                    <span>{quantity}</span>
                    <span onClick={()=>handleQuantityChange("increase")}>+</span>
                </div>
                <div className="btns">
                    <button className="banner-button">Buy Now</button>
                    <button className="banner-button">Add to cart</button>
                </div>
            </div>
          </div>
        </div>
        <div className="remain-details">
            <div className="tabs">
                <span onClick={()=>setCurrentTab(1)} className={`${currentTab===1&&"active"}`}>Description
                </span>
                <span onClick={()=>setCurrentTab(3)} className={`${currentTab===2&&"active"}`}>Additional Details</span>
                <span onClick={()=>setCurrentTab(2)} className={`${currentTab===2&&"active"}`}>Review</span>
            </div>
            {currentTab === 1 ?(
                <div className="description">
                    <div className="product-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, repellat deserunt quibusdam quisquam minus ad. Eum deleniti ullam, a odit consequatur recusandae quo dolorum aut saepe sit, explicabo pariatur quod!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, repellat deserunt quibusdam quisquam minus ad. Eum deleniti ullam, a odit consequatur recusandae quo dolorum aut saepe sit, explicabo pariatur quod!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, repellat deserunt quibusdam quisquam minus ad. Eum deleniti ullam, a odit consequatur recusandae quo dolorum aut saepe sit, explicabo pariatur quod!
                    </div>
                </div>
            ):currentTab === 2?(
                <div className="review">
                <TitleSection title='Leave a Review'/>
                <Form
                name="reviewForm"
                onFinish={onFinishReview}
                layout="vertical"
                className="review-form"
                >
                <Form.Item
                    name="rating"
                    label="Rating"
                    rules={[{ required: true, message: "Please provide a rating!" }]}
                >
                    <Rate />
                </Form.Item>
                <Form.Item
                    name="comment"
                    label="Comment"
                    rules={[{ required: true, message: "Please write your comment!" }]}
                >
                    <Input.TextArea rows={4} placeholder="Write your review here..." />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="banner-button">
                    Submit Review
                    </Button>
                </Form.Item>
                </Form>
            </div>
            ):(
                <div className="additional-details">
                        <table className="details-table">
                            <thead>
                                <tr>
                                    <th>Color</th>
                                    <th>Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span style={{width:'20px',height:'20px',backgroundColor:'#33b6b5',display:"block",margin:'0 auto',borderRadius:'20px'}}></span></td>
                                    <td>M</td>
                                </tr>
                                <tr>
                                <td><span style={{width:'20px',height:'20px',backgroundColor:'#ff6f61',display:"block",margin:'0 auto',borderRadius:'20px'}}></span></td>
                                    <td>L</td>
                                </tr>
                                <tr>
                                <td><span style={{width:'20px',height:'20px',backgroundColor:'#333',display:"block",margin:'0 auto',borderRadius:'20px'}}></span></td>
                                    <td>S</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            )}
        </div>
        <TitleSection title="Kids Clothing" secTitle="View All" to="/products" />
        <div className="products-container">
          {products?.map((product, index) => (
            <ProductCard key={product?.id || index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsInfo;
