/* eslint-disable react/prop-types */
import { Rate } from "antd"
import { Link } from "react-router-dom"
import { FaCartPlus } from 'react-icons/fa';

const ProductCard = ({product}) => {
  return (
    <>
                  <Link to={`/product/${product?.name}`} key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-rating">
                    <Rate disabled defaultValue={product.rating} />
                  </div>
                <p className="product-description">{product.description}</p>
                <div className="price-section">
                  <span className="original-price">{product.originalPrice}</span>
                  <span className="discounted-price">{product.discountedPrice}</span>
                </div>
                {/* <Link type="primary" className="view-details-link add-product" title="Add to cart">
                  <FaCartPlus />
                </Link> */}
                <Link to={`/product/${product.id}`} className="view-details-link" title="Add to cart">
                  <FaCartPlus />
                </Link>
                <div className="card-footer">
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
              </div>
            </Link>
    </>
  )
}

export default ProductCard
