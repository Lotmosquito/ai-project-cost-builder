// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// ИСПОЛЬЗУЕМ СТАРУЮ БИБЛИОТЕКУ И ПРАВИЛЬНЫЙ ХУК useSDK
import {
  SDKProvider,
  useSDK, // <--- ВОТ ОН, НАСТОЯЩИЙ!
  BackButton,
} from '@telegram-apps/sdk-react';
import './index.css';

// ВРЕМЕННАЯ ЗАГЛУШКА КАЛЬКУЛЯТОРА
function CalculatorPlaceholder() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Калькулятор проектов</h1>
      <p>Финальная попытка!</p>
    </div>
  );
}

// Компонент для синхронизации темы
function ThemeSynchronizer() {
  // ИСПОЛЬЗУЕМ useSDK
  const { webApp } = useSDK();

  React.useEffect(() => {
    if (webApp && webApp.themeParams) {
      document.documentElement.style.setProperty('--bg-color', webApp.themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--text-color', webApp.themeParams.text_color || '#000000');
    }
  }, [webApp]);

  return null;
}

// Главный компонент
function MainApp() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
      }}
    >
      <ThemeSynchronizer />
      <BackButton />
      <CalculatorPlaceholder />
    </div>
  );
}

// Рендерим все в DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SDKProvider>
      <MainApp />
    </SDKProvider>
  </React.StrictMode>,
);
