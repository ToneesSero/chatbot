import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Создайте свой уютный дом</h1>
        <p>Качественная мебель по доступным ценам с бесплатной доставкой</p>
        <Link to="/catalog" className="cta-button">Посмотреть каталог</Link>
      </div>
    </section>
  );
};

export default HeroSection;