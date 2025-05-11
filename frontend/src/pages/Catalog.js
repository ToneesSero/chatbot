import React, { useState } from 'react';
import { products } from '../assets/data';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Catalog.css';

const Catalog = () => {
  const categories = ['Все', ...new Set(products.map(product => product.category))];
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const { addToCart } = useCart();
  
  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1
    });
  };

  return (
    <div className="catalog-page">
      <div className="container">
        <h1>Каталог мебели</h1>
        
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={`/images/${product.image}`} alt={product.name} />
                <div className="product-overlay">
                  <Link to={`/product/${product.id}`} className="quick-view">
                    Быстрый просмотр
                  </Link>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">{product.price.toLocaleString()} ₽</p>
                <button 
                  className="add-to-cart" 
                  onClick={() => handleAddToCart(product)}
                >
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;