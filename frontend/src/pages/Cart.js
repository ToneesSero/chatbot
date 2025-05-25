import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Корзина</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Ваша корзина пуста</p>
            <Link to="/catalog" className="continue-shopping">
              Продолжить покупки
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={`${item.image}`} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="category">{item.category}</p>
                    <p className="price">{item.price.toLocaleString()} ₽</p>
                    
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    
                    <button 
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h3>Итого</h3>
              <p className="total-price">{totalPrice.toLocaleString()} ₽</p>
              <button className="checkout-btn">Оформить заказ</button>
              <button className="clear-cart" onClick={clearCart}>
                Очистить корзину
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;