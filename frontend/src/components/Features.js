import React, {useEffect, useState} from 'react';
import './Features.css';

const features = [
  {
    icon: '🚚',
    title: 'Бесплатная доставка',
    description: 'При заказе от 20 000 рублей'
  },
  {
    icon: '🛠️',
    title: 'Сборка мебели',
    description: 'Профессиональная сборка на дому'
  },
  {
    icon: '💳',
    title: 'Рассрочка',
    description: 'Без процентов до 12 месяцев'
  },
  {
    icon: '🔄',
    title: 'Возврат',
    description: '14 дней на возврат товара'
  }
];

const Features = () => {


  return (
    <section className="features">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;