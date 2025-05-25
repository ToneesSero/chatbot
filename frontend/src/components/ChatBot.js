import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ChatBot.css';

const ChatBot = ({ isOpen, onClose, user }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [operatorMode, setOperatorMode] = useState(false);
  const messagesEndRef = useRef(null);

  // База знаний
  const knowledgeBase = {
    order: {
      questions: ['заказ', 'оформить', 'купить'],
      answer: 'Вы можете оформить заказ на сайте или по телефону +7 (495) 123-45-67'
    },
    delivery: {
      questions: ['доставка', 'сроки', 'привезти'],
      answer: 'Доставка занимает 1-3 рабочих дня'
    }
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const addBotMessage = useCallback((text) => {
    setMessages(prev => [...prev, { text, type: 'bot', fromBot: true }]);
    scrollToBottom();
  }, [scrollToBottom]);

  const addUserMessage = useCallback((text) => {
    setMessages(prev => [...prev, { text, type: 'user', fromBot: false }]);
    scrollToBottom();
  }, [scrollToBottom]);

  const showQuickReplies = useCallback(() => {
    const categories = [
      { text: 'Как сделать заказ?', value: 'order' },
      { text: 'Информация о доставке', value: 'delivery' },
      { text: 'Связаться с оператором', value: 'operator' }
    ];
    setMessages(prev => [...prev, { 
      type: 'quick-reply', 
      options: categories,
      fromBot: true 
    }]);
    scrollToBottom();
  }, [scrollToBottom]);

  const startConversation = useCallback(() => {
    addBotMessage('👋 Добрый день! Чем могу помочь?');
    setTimeout(() => {
      showQuickReplies();
    }, 1000);
  }, [addBotMessage, showQuickReplies]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
    }
  }, [isOpen, messages.length, startConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      processUserInput(inputValue);
      setIsTyping(false);
    }, 1500);
  };

  const processUserInput = (input) => {
    const lowerInput = input.toLowerCase();

    fetch("/api/nlp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  })
    .then(res => res.json())
    .then(data => {
        if (lowerInput.includes('оператор')) {
      transferToOperator();
      return;
    }

      // let found = false;
        addBotMessage(data.answer);
      // for (const [data] of Object.entries(knowledgeBase)) {
      //   if (data.questions.some(q => lowerInput.includes(q))) {
      //     addBotMessage(data.answer);
      //     found = true;
      //     break;
      //   }
      // }
    })
    .catch(() => console.log("Ошибка при обращении к боту"));
    

  };

  const transferToOperator = () => {
    setOperatorMode(true);
    addBotMessage('Соединяю с оператором...');
  };

  const handleQuickReply = (option) => {
    addUserMessage(option.text);
    setIsTyping(true);
    
    setTimeout(() => {
      if (option.value === 'operator') {
        transferToOperator();
      } else {
        addBotMessage(knowledgeBase[option.value].answer);
        showQuickReplies();
      }
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Помощник магазина</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.text}
            {msg.options && (
              <div className="quick-replies">
                {msg.options.map((opt, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleQuickReply(opt)}
                    disabled={operatorMode}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={operatorMode ? "Общайтесь с оператором..." : "Введите ваш вопрос..."}
          disabled={operatorMode}
        />
        <button 
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || operatorMode}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatBot;