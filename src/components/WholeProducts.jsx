import { useState } from "react";
import { Checkbox, Pagination } from "antd";
import ProductCard from '../Shared/ProductCard';
import '../Style/WholeProducts.css';
import TitleSection from "../Shared/TitleSection";
import { IoGridOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { useShowProductColorsQuery, useShowProductsQuery } from "../app/Api/Product";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { useShowCategoryQuery } from "../app/Api/Categories";

const WholeProducts = () => {
  const { i18n } = useTranslation();
  const { data: categories } = useShowCategoryQuery();
  const { data: allColors } = useShowProductColorsQuery();
  
  const categoryName = localStorage.getItem('categoryName') || '';
  
  const [filter, setFilter] = useState({
    category: categoryName,
    color: [],
    size: [],
    search: "",
    price: "", 
  });

  const [openCategory, setOpenCategory] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [show, setShow] = useState('grid');
  const [page, setPage] = useState(1); 

  const query = {
    page,
    category: filter.category,
    color: filter.color.join(","),
    size: filter.size.join(","),
    search: filter.search,
    price: filter.price,
  };

  const { data, isLoading, error } = useShowProductsQuery(query);

  const handleShowBox = (type) => {
    setShow(type);
  };

  const handleFilterChange = (filterType, value) => {
    setFilter((prev) => {
      if (prev[filterType]?.includes(value)) {
        return {
          ...prev,
          [filterType]: prev[filterType].filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [filterType]: [...(prev[filterType] || []), value],
        };
      }
    });
  };
  



  const handleClearSelectedFilter = (filterType, valueToRemove) => {
    setFilter((prev) => {
      const updatedFilter = prev[filterType].filter((item) => item !== valueToRemove); // إزالة العنصر المحدد فقط
      return {
        ...prev,
        [filterType]: updatedFilter, 
      };
    });
  };
  
  
  
  


  const handleClearFilters = () => {
    setFilter({
      category: "",
      color: [],
      size: [],
      search: "",
      price: "", 
    });
    localStorage.removeItem('categoryName');
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  if (error) return;

  return (
    <div className="WholeProducts">
      <div className="containerProducts">
        <div className="right-product">
          <TitleSection title={i18n.language === 'EN' ? "Filters" : "المرشحات"} />
          <div className="filter-product">
          <button onClick={handleClearFilters} className="clear-filters">{i18n.language === 'EN' ? "Clear Filters" : "مسح الفلاتر"}</button>
          <div className="selected-filters">
          {Array.isArray(filter.category) && filter.category.length > 0 && (
  <div className="selected-filters-nested">
    {filter.category.map((categoryValue, index) => (
      <button 
        key={index}
        onClick={() => handleClearSelectedFilter("category", categoryValue)}
        className="btn-filter-show"
      >
          {categoryValue}
      </button>
    ))}
  </div>
)}

{filter.color && filter.color.length > 0 && (
  <div className="selected-filters-nested">
    {filter.color.map((colorValue, index) => (
      <button 
        key={index}
        onClick={() => handleClearSelectedFilter("color", colorValue)}
        className="btn-filter-show"
      >
        {colorValue} 
      </button>
    ))}
  </div>
)}

{filter.size && filter.size.length > 0 && (
  <div  className="selected-filters-nested">
    {filter.size.map((sizeValue, index) => (
      <button 
        key={index}
        onClick={() => handleClearSelectedFilter("size", sizeValue)}
        className="btn-filter-show"
      >
        {sizeValue}
      </button>
    ))}
  </div>
)}

            </div>

            <div className="cont">
              <p>{i18n.language === 'EN' ? "Search" : "بحث"}</p>
              <input
                type="text"
                name="search"
                placeholder={i18n.language === 'EN' ? "Search by name" : "البحث بالاسم"}
                value={filter.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <div className="cont">
              <p onClick={() => setOpenPrice(!openPrice)} className="filter-title">{i18n.language === 'EN' ? "Price" : "السعر"}</p>
              <div className={`filter-checkbox-container ${openPrice ? "open" : ""}`}>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("price", "low-to-high")} 
                    />
                  <label>{i18n.language === 'EN' ? "Low to High" : "منخفض إلى مرتفع"}</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("price", "high-to-low")} />
                  <label>{i18n.language === 'EN' ? "High to Low" : "من الأعلى إلى الأدنى"}</label>
                </div>
              </div>
            </div>

            <div className="cont">
              <p onClick={() => setOpenCategory(!openCategory)} className="filter-title">{i18n.language === 'EN' ? "Category" : "الاقسام"}</p>
              <div className={`filter-checkbox-container ${openCategory ? "open" : ""}`}>
                {categories?.categories?.map((category, index) => (
                  <div className="filter-checkbox" key={index}>
<Checkbox
  onChange={(e) => handleFilterChange(
    "category", 
    e.target.checked 
      ? (i18n.language === 'EN' ? category.name_en : category.name_ar) 
      : ""
  )}
  checked={filter.category?.includes(i18n.language === 'EN' ? category.name_en : category.name_ar)}
/>

                    <label>{i18n.language === 'EN' ? category.name_en : category.name_ar}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="cont">
              <p onClick={() => setOpenColor(!openColor)} className="filter-title">{i18n.language === 'EN' ? "Color" : "اللون"}</p>
              <div className={`filter-checkbox-container ${openColor ? "open" : ""}`}>
                {Object.keys(allColors?.colors || {}).map((colorKey) => (
                  <div key={colorKey} className="filter-checkbox">
                    <Checkbox onChange={() => handleFilterChange('color', colorKey)}
                      checked={filter.color.includes(colorKey)} 
                      />
                    <span
                      className="color-box"
                      style={{ backgroundColor: colorKey }}
                      title={colorKey}
                    ></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cont">
              <p onClick={() => setOpenSize(!openSize)} className="filter-title">{i18n.language === 'EN' ? "Size" : "المقاس"}</p>
              <div className={`filter-checkbox-container ${openSize ? "open" : ""}`}>
                <div className="filter-checkbox">
                <Checkbox
  onChange={() => handleFilterChange("size", "S")}
  checked={filter.size?.includes("S")}
 />

                  <label>S</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "M")}
  checked={filter.size?.includes("M")}
  />
                  <label>M</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "L")} 
  checked={filter.size?.includes("L")}
  />
                  <label>L</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "XL")} 
                      checked={filter.size?.includes("XL")}
/>
                  <label>XL</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "2XL")}
                      checked={filter.size?.includes("2XL")}
                      />
                  <label>2XL</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "3XL")}
                                        checked={filter.size?.includes("3XL")}
                                        />
                  <label>3XL</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "2")} 
                                          checked={filter.size?.includes("2")}
/>
                  <label>2</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "4")} 
                                          checked={filter.size?.includes("4")}
/>
                  <label>4</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "6")} 
                                          checked={filter.size?.includes("6")}
/>
                  <label>6</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "8")} 
                                          checked={filter.size?.includes("8")}
/>
                  <label>8</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "10")}
                                        checked={filter.size?.includes("10")}
                                        />
                  <label>10</label>
                </div>
                <div className="filter-checkbox">
                  <Checkbox onChange={() => handleFilterChange("size", "12")} 
                                          checked={filter.size?.includes("12")}
/>
                  <label>12</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="leftProduct">
          <div className="top-product">
            <TitleSection title={i18n.language === 'EN' ? "All Products" : "جميع المنتجات"} />
            <div className="list-vies">
              <IoGridOutline className={`${show === 'grid' ? "active" : ""}`} onClick={() => handleShowBox('grid')} />
              <FaListUl className={`${show === 'grid' ? "" : "active"}`} onClick={() => handleShowBox('flex')} />
            </div>
          </div>
          <div className={`${show === "grid" ? "products-container" : "products-container-flex"}`}>
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
              data?.products?.data?.slice(0, 8)?.map((product, index) => (
                <ProductCard key={product.id || index} product={product} />
              ))
            )}
          </div>
          <div className="pagination-container">
            <Pagination
              current={page}
              pageSize={data?.products?.per_page || 10} 
              total={data?.products?.total || 0} 
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholeProducts;
