import TitleSection from "../Shared/TitleSection";
import "../Style/Products.css";  
import ProductCard from "../Shared/ProductCard";

const Products = () => {
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
    { 
      id: 2, 
      name: "Kids Winter Jacket", 
      description: "Warm and stylish jacket for cold seasons Warm and stylish jacket for cold seasons.", 
      originalPrice: "$50", 
      discountedPrice: "$40", 
      rating: 4,  
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/5350575712_6_2_1-420x525.jpg", 
      price: "$40",
      colors: ["#FF0000", "#000000", "#008000"],
      sizes: ["M", "L", "XL"]
    },
    { 
      id: 3, 
      name: "Toddler Sneakers", 
      description: "Durable and comfy sneakers for toddlers Durable and comfy sneakers for toddlers.", 
      originalPrice: "$30", 
      discountedPrice: "$25", 
      rating: 5,  
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/7947504812_6_1_1-420x525.jpg", 
      price: "$25",
      colors: ["#FFFFFF", "#000000", "#808080"],
      sizes: ["22", "24", "26"]
    },
    { 
      id: 4, 
      name: "Baby Girl Dress", 
      description: "Adorable dress for baby girls, perfect for outings perfect for outings.", 
      originalPrice: "$35", 
      discountedPrice: "$30", 
      rating: 5,  
      image: "https://debebe.vamtam.com/wp-content/uploads/2022/06/6224845703_6_2_1-420x525.jpg",
      price: "$30",
      colors: ["#FFFF00", "#FFC0CB", "#800080"],
      sizes: ["S", "M", "L"]
    },
    { 
      id: 10, 
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

  ];

  return (
    <div className="products-container-section">
      <div className="products-section">
        <TitleSection title='Kids Clothing' secTitle='View All' to='/products'/>
        <div className="products-container">
        {products?.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
