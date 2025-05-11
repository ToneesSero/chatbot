import React from 'react';
import './Delivery.css';

const Delivery = () => {
  return (
    <div className="delivery-page">
      <div className="container">
        <h1>Доставка и сборка</h1>
        
        <div className="delivery-content">
          <div className="delivery-section">
            <h2>Стоимость доставки</h2>
            <ul>
              <li>Бесплатно - при заказе от 20 000 ₽</li>
              <li>500 ₽ - в пределах МКАД</li>
              <li>1 000 ₽ - за МКАД (до 10 км)</li>
              <li>+ 50 ₽ за каждый дополнительный км</li>
            </ul>
          </div>
          
          <div className="delivery-section">
            <h2>Сроки доставки</h2>
            <p>Стандартные сроки доставки - 3-5 рабочих дней после подтверждения заказа.</p>
            <p>Для индивидуальных заказов сроки согласовываются отдельно.</p>
          </div>
          
          <div className="delivery-section">
            <h2>Сборка мебели</h2>
            <p>Мы предлагаем профессиональную сборку мебели нашими специалистами:</p>
            <ul>
              <li>10% от стоимости товара - стандартная сборка</li>
              <li>15% от стоимости товара - сложная сборка (кухни, гардеробные)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;