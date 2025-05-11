import React from 'react';
import './Contacts.css';

const Contacts = () => {
  return (
    <div className="contacts-page">
      <div className="container">
        <h1>Контакты</h1>
        
        <div className="contacts-content">
          <div className="contacts-info">
            <h2>Наши контакты</h2>
            <p><strong>Адрес:</strong> г. Москва, ул. Мебельная, 15</p>
            <p><strong>Телефон:</strong> +7 (495) 123-45-67</p>
            <p><strong>Email:</strong> info@uyutny-dom.ru</p>
            <p><strong>Режим работы:</strong> Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-20:00</p>
          </div>
          
          <div className="contacts-map">
            <iframe 
              title="Карта"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A1a2b3c4d5e6f7g8h9i0j&amp;source=constructor"
              width="100%" 
              height="400"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;