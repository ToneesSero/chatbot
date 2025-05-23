import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Уютный Дом</Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/about">О нас</Link></li>
            <li><Link to="/delivery">Доставка</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="search-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link to="/cart" className="cart-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;