import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import About from './The_Split/About';
import Price from './The_Split/Price';
import MainHub from './The_Split/MainHubMap';
import DrinkSelectMenu from './The_Split/DrinkSelectMenu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Конфликтующие теги BrowserRouter удалены. Используются только чистые роуты */}
        <Routes>
          {/* Главная страница сайта сразу открывает тактическую карту */}
          <Route path="/" element={<MainHub />} />
          
          {/* Остальные роуты для навигации в приложении */}
          <Route path="/About" element={<About />} />
          <Route path="/MainHubMap" element={<MainHub />} />
          <Route path="/Price" element={<Price />} />
          <Route path="/DrinkMenu" element={<DrinkSelectMenu />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
