import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';
import About from './pages/About';
import Delivery from './pages/Delivery';
import Contacts from './pages/Contacts';
import ChatBot from './components/ChatBot';
import './styles/main.css'; // Убедитесь, что этот импорт есть

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
        <Footer />

        {/* Кнопка открытия чата */}
        <button 
          className="chat-toggle-button"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? '✕' : '💬 Помощь'}
        </button>

        {/* Компонент чата */}
        <ChatBot 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
        />
      </Router>
    </CartProvider>
  );
}

export default App;