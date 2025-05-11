import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>О нас</h1>
        <div className="about-content">
          <div className="about-text">
            <h2>Наша история</h2>
            <p>
              Мебельный магазин "Уютный Дом" был основан в 2010 году с целью предоставления 
              качественной и доступной мебели для каждого дома.
            </p>
            <h2>Наши принципы</h2>
            <ul>
              <li>Качество материалов и сборки</li>
              <li>Доступные цены</li>
              <li>Индивидуальный подход</li>
            </ul>
          </div>
          <div className="about-image-placeholder">
            [Фото магазина]
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;