// src/App.jsx

import { useEffect } from 'react';
import { SDKProvider, useWebApp, BackButton } from '@telegram-apps/sdk-react';

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


/**
 * Компонент, который отвечает за синхронизацию темы Telegram с CSS-переменными
 */
function ThemeSynchronizer() {
  const webApp = useWebApp();

  useEffect(() => {
    // Этот код синхронизирует тему оформления Telegram с приложением [cite: 111, 112]
    if (webApp && webApp.themeParams) {
      document.documentElement.style.setProperty('--bg-color', webApp.themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--text-color', webApp.themeParams.text_color || '#000000');
      document.documentElement.style.setProperty('--hint-color', webApp.themeParams.hint_color || '#999999');
      document.documentElement.style.setProperty('--link-color', webApp.themeParams.link_color || '#007aff');
      document.documentElement.style.setProperty('--button-color', webApp.themeParams.button_color || '#007aff');
      document.documentElement.style.setProperty('--button-text-color', webApp.themeParams.button_text_color || '#ffffff');
    }
  }, [webApp]);

  return null; // Этот компонент ничего не рендерит, он только управляет стилями
}


/**
 * Основной компонент приложения
 */
function App() {
  return (
    <SDKProvider>
      <ThemeSynchronizer />
      {/* Этот компонент добавит нативную кнопку "Назад" в интерфейс Telegram [cite: 113] */}
      <BackButton />
      <div 
        className="min-h-screen" 
        style={{ 
          backgroundColor: 'var(--bg-color)', 
          color: 'var(--text-color)' 
        }}
      >
        <Calculator />
      </div>
    </SDKProvider>
  );
}

export default App;
