import  { memo } from 'react';
import '../Style/Categories.css';
import TitleSection from '../Shared/TitleSection';
import { useShowCategoryQuery } from '../app/Api/Categories';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 
import { Link } from 'react-router-dom';

const Categories = () => {
  const { data: categories, isLoading, error } = useShowCategoryQuery();
  const { i18n } = useTranslation();

  if (categories?.categories?.length === 0) return null;
  if (error) return null;

  return (
    <div className="cat-sec-cont">
      <div className="categories-container">
        <div className="categories-header">
          <TitleSection
            title={i18n.language === 'EN' ? "Categories" : "الاقسام"}
            secTitle={i18n.language === 'EN' ? "View All" : "عرض الكل"}
            to="/product"
          />
        </div>

        <div className="categories-grid">
          {isLoading ? (
            Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="category-card">
                  <Skeleton height="350px" width="280px"/>
                  <div className="category-overlay">
                    <Skeleton width="60%" height="20px" />
                    <Skeleton width="40%" height="15px" />
                  </div>
                </div>
              ))
          ) : (
            categories?.categories.map((category, index) => (
              <Link to='/product' key={index} className="category-card" style={{cursor:'pointer'}}
              onClick={()=>localStorage.setItem('categoryName',i18n.language === 'EN' ? category.name_en : category.name_ar)}>
                <img
                  src={category.image}
                  alt={i18n.language === 'EN' ? category.name_en : category.name_ar}
                />
                <div className="category-overlay">
                  <h3 className="category-name">
                    {i18n.language === 'EN' ? category.name_en : category.name_ar}
                  </h3>
                  {/* <p className="product-count">{category.productCount} products</p> */}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Categories);
