import TitleSection from "../Shared/TitleSection";
import "../Style/Products.css";
import ProductCard from "../Shared/ProductCard";
import { useShowProductsQuery } from "../app/Api/Product";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { data, isLoading, error } = useShowProductsQuery(1);
  const {i18n} = useTranslation();

  if (error) return;
  if ( data?.products?.data?.length === 0) return;

  return (
    <div className="products-container-section">
      <div className="products-section">
        <TitleSection  title={i18n.language === 'EN' ? "Latest Products" : "أحدث المنتجات"}
            secTitle={i18n.language === 'EN' ? "View All" : "عرض الكل"} to="/product" />
        <div className="products-container">
          {isLoading ? (
            [...Array(8)].map((_, index) => (
              <div key={index} className="product-skeleton">
                <Skeleton height={200} width={250} />
                <Skeleton height={20} width={250} style={{ marginTop: "10px" }} />
                <Skeleton height={20} width={180} style={{ marginTop: "10px" }} />
                <Skeleton height={15} width={120} style={{ marginTop: "5px" }} />
              </div>
            ))
          ) : (
            data?.products?.data?.slice(0,8)?.map((product, index) => (
              <ProductCard key={product.id || index} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
