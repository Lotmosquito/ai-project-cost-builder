// src/main.tsx

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- Сюда нужно будет вставить твой компонент калькулятора ---
// --- Lovable.dev скорее всего создал его в отдельном файле ---
// --- Например, import Calculator from './components/Calculator'; ---
function Calculator() {
  // Весь JSX и логика твоего калькулятора должны быть здесь или импортированы
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Калькулятор проектов</h1>
      {/* Здесь будет вся структура твоего калькулятора */}
      <p>Тут будет твой калькулятор...</p>
    </div>
  );
}
// -----------------------------------------------------------------


function App() {
  useEffect(() => {
    // Проверяем, доступен ли объект Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      // Включаем нативную кнопку "Назад"
      tg.BackButton.show();

      // Синхронизируем тему
      const themeParams = tg.themeParams;
      document.documentElement.style.setProperty('--bg-color', themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--text-color', themeParams.text_color || '#000000');
      document.documentElement.style.setProperty('--hint-color', themeParams.hint_color || '#999999');
      document.documentElement.style.setProperty('--link-color', themeParams.link_color || '#007aff');
      document.documentElement.style.setProperty('--button-color', themeParams.button_color || '#007aff');
      document.documentElement.style.setProperty('--button-text-color', themeParams.button_text_color || '#ffffff');
    }
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}
    >
      <Calculator />
    </div>
  );
}

// Стандартная инициализация React-приложения
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
