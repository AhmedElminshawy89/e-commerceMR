import '../Style/Categories.css';
import TitleSection from '../Shared/TitleSection';

const Categories = () => {
  const categories = [
    { name: "Clothing - Men", image: "https://debebe.vamtam.com/wp-content/uploads/2022/05/pexels-antoni-shkraba-6261906.jpg", productCount: 120 },
    { name: "Clothing - Women", image: "https://debebe.vamtam.com/wp-content/uploads/2022/05/pexels-cottonbro-8142715.jpg", productCount: 150 },
    { name: "Clothing - Kids", image: "https://debebe.vamtam.com/wp-content/uploads/2022/05/pexels-antoni-shkraba-6261897-1.jpg", productCount: 90 },
    { name: "Clothing - Accessories", image: "https://debebe.vamtam.com/wp-content/uploads/2022/05/pexels-ksenia-chernaya-4048683.jpg", productCount: 70 },
  ];

  return (
    <div className="cat-sec-cont">
      <div className="categories-container">
        <div className="categories-header">
          <TitleSection title="Categories" secTitle='View All' to='/product'/>
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <img src={category.image} alt={category.name} />
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
                <p className="product-count">{category.productCount} products</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
