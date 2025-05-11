import React from 'react';
import { Link } from 'react-router-dom';
import './ProductGallery.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { products } from '../assets/data';

const ProductGallery = () => {
  return (
    <section className="product-gallery" id="product-gallery">
      <h2 className="section-title">Наши коллекции</h2>
      <div className="container">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={4}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 15 },
            576: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            1200: { slidesPerView: 4, spaceBetween: 30 }
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <div className="product-card">
                <div className="product-image">
                  <img src={`/images/${product.image}`} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="price">{product.price.toLocaleString()} ₽</p>
                  <Link to={`/product/${product.id}`} className="view-btn">Подробнее</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default ProductGallery;