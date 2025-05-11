import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Уютный Дом</h3>
            <p>Мы создаем мебель, которая делает ваш дом уютнее и комфортнее.</p>
          </div>
          <div className="footer-section">
            <h4>Меню</h4>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/catalog">Каталог</Link></li>
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/delivery">Доставка</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Контакты</h4>
            <p>г. Санкт-Петербург, ул. Мебельная, 12345</p>
            <p>+7 (800)555-35-35</p>
            <p>info@uyutny-dom.ru</p>
          </div>
          <div className="footer-section">
            <h4>Мы в соцсетях</h4>
            <div className="social-icons">
              <Link to="/instagram">Instagram</Link>
              <Link to="/facebook">Facebook</Link>
              <Link to="/vk">VK</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 Уютный Дом. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;