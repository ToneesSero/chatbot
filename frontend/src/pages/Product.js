import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../assets/data';
import { useCart } from '../contexts/CartContext';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return <div className="product-not-found">Товар не найден</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity
    });
  };

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-content">
          <div className="product-image">
            <img src={`${product.image}`} alt={product.name} />
          </div>
          
          <div className="product-details">
            <h1>{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <p className="product-price">{product.price.toLocaleString()} ₽</p>
            
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            
            <button className="add-to-cart" onClick={handleAddToCart}>
              Добавить в корзину
            </button>
            
            <div className="product-description">
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;