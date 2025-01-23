import { useState } from "react";
import { Checkbox } from "antd";
import ProductCard from '../Shared/ProductCard';
import '../Style/WholeProducts.css';
import TitleSection from "../Shared/TitleSection";
import { IoGridOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";

const WholeProducts = () => {
  const [filter, setFilter] = useState({
    category: "",
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

  const products = [
    { 
      id: 5, 
      name: "Kids Hoodie", 
      description: "Comfortable hoodie for kids, available in multiple colors.", 
      category: "Clothing",
      colors: ["#0000FF", "#808080", "#000000"],
      sizes: ["M", "L", "XL"],
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/5643519108_6_1_1-420x525.jpeg",
      price: "$35",
      rating: 4,
    },
    { 
      id: 7, 
      name: "Toddler Sneakers", 
      description: "Durable and comfy sneakers for toddlers.", 
      category: "Footwear",
      colors: ["#FFFFFF", "#000000", "#808080"],
      sizes: ["22", "24", "26"],
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/1-1-420x525.webp",
      price: "$25",
      rating: 3,
    },
    { 
        id: 5, 
        name: "Kids Hoodie", 
        description: "Comfortable hoodie for kids, available in multiple colors.", 
        category: "Clothing",
        colors: ["#0000FF", "#808080", "#000000"],
        sizes: ["M", "L", "XL"],
        image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/5643519108_6_1_1-420x525.jpeg",
        price: "$35",
        rating: 4,
      },
      { 
        id: 7, 
        name: "Toddler Sneakers", 
        description: "Durable and comfy sneakers for toddlers.", 
        category: "Footwear",
        colors: ["#FFFFFF", "#000000", "#808080"],
        sizes: ["22", "24", "26"],
        image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/1-1-420x525.webp",
        price: "$25",
        rating: 3,
      },
  ];

const handleShowBox = (type)=>{
  setShow(type);
}

  const handleFilterChange = (name, value) => {
    setFilter((prev) => {
      if (name === "color" || name === "size") {
        const values = prev[name].includes(value)
          ? prev[name].filter((v) => v !== value)
          : [...prev[name], value];
        return { ...prev, [name]: values };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter.category ? product.category === filter.category : true;
    const matchesColor = filter.color.length ? filter.color.some((c) => product.colors.includes(c)) : true;
    const matchesSize = filter.size.length ? filter.size.some((s) => product.sizes.includes(s)) : true;
    const matchesSearch = filter.search
      ? product.name.toLowerCase().includes(filter.search.toLowerCase())
      : true;

    return matchesCategory && matchesColor && matchesSize && matchesSearch;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (filter.price === "low-to-high") {
      return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
    } else if (filter.price === "high-to-low") {
      return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    }
    return 0;
  });

  return (
    <div className="WholeProducts">
      <div className="containerProducts">
        <div className="right-product">
        <TitleSection title='Filters' />
        <div className="filter-product">
          <div className="cont">
            <p>Search</p>
            <input
              type="text"
              name="search"
              placeholder="Search by name"
              value={filter.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <div className="cont">
            <p onClick={() => setOpenPrice(!openPrice)} className="filter-title">Price</p>
            <div className={`filter-checkbox-container ${openPrice ? "open" : ""}`}>
              <div className="filter-checkbox">
                <Checkbox onChange={() => handleFilterChange("price", "low-to-high")} />
                <label>Low to High</label>
              </div>
              <div className="filter-checkbox">
                <Checkbox onChange={() => handleFilterChange("price", "high-to-low")} />
                <label>High to Low</label>
              </div>
            </div>
          </div>

          <div className="cont">
            <p onClick={() => setOpenCategory(!openCategory)} className="filter-title">Category</p>
            <div className={`filter-checkbox-container ${openCategory ? "open" : ""}`}>
              <div className="filter-checkbox">
                <Checkbox
                  onChange={(e) => handleFilterChange("category", e.target.checked ? "Clothing" : "")}
                />
                <label>Clothing</label>
              </div>
              <div className="filter-checkbox">
                <Checkbox
                  onChange={(e) => handleFilterChange("category", e.target.checked ? "Footwear" : "")}
                />
                <label>Footwear</label>
              </div>
            </div>
          </div>

          <div className="cont">
            <p onClick={() => setOpenColor(!openColor)} className="filter-title">Color</p>
            <div className={`filter-checkbox-container ${openColor ? "open" : ""}`}>
              <div className="filter-checkbox">
                <Checkbox onChange={() => handleFilterChange("color", "#0000FF")} />
                <span className="color-box" style={{ backgroundColor: '#0000FF' }} title={'#0000FF'}></span>
              </div>
              <div className="filter-checkbox">
                <Checkbox onChange={() => handleFilterChange("color", "#808080")} />
                <span className="color-box" style={{ backgroundColor: '#808080' }} title={'#808080'}></span>
              </div>
              <div className="filter-checkbox">
                <Checkbox onChange={() => handleFilterChange("color", "#000000")} />
                <span className="color-box" style={{ backgroundColor: '#000000' }} title={'#000000'}></span>
              </div>
            </div>
          </div>

          <div className="cont">
            <p onClick={() => setOpenSize(!openSize)} className="filter-title">Size</p>
            <div className={`filter-checkbox-container ${openSize ? "open" : ""}`}>
              <div className="filter-checkbox">
                <Checkbox onChange={() => handleFilterChange("size", "M")} />
                <label>M</label>
              </div>
              <div className="filter-checkbox">
                <Checkbox onChange={() => handleFilterChange("size", "L")} />
                <label>L</label>
              </div>
              <div className="filter-checkbox">
                <Checkbox onChange={() => handleFilterChange("size", "XL")} />
                <label>XL</label>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="leftProduct">
            <div className="top-product">
        <TitleSection title='All Products'/>
            <div className="list-vies">
                <IoGridOutline className={`${show==='grid'?"active":""}`} onClick={()=>handleShowBox('grid')}/>
                <FaListUl className={`${show==='grid'?"":"active"}`} onClick={()=>handleShowBox('flex')}/>
            </div>
            </div>
        <div className={`${show==="grid"?"products-container":"products-container-flex"}`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default WholeProducts;
