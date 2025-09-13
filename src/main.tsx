// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  SDKProvider,
  BackButton,
  useThemeParams,
} from '@tma.js/sdk-react';
import './index.css';

// ВРЕМЕННАЯ ЗАГЛУШКА КАЛЬКУЛЯТОРА
function CalculatorPlaceholder() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Калькулятор проектов</h1>
      <p>Сначала добьемся успешной сборки!</p>
    </div>
  );
}

// Компонент для синхронизации темы
function ThemeSynchronizer() {
  const themeParams = useThemeParams();

  React.useEffect(() => {
    document.documentElement.style.setProperty('--bg-color', themeParams.backgroundColor || '#ffffff');
    document.documentElement.style.setProperty('--text-color', themeParams.textColor || '#000000');
    // ... и остальные стили
  }, [themeParams]);

  return null;
}

// Главный компонент, который мы рендерим
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
      <div className="min-h-screen">
        <CalculatorPlaceholder />
      </div>
    </div>
  );
}

// Рендерим все в DOM, обернув в SDKProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ИЗМЕНЕНИЕ ЗДЕСЬ: Добавили опции в провайдер */}
    <SDKProvider acceptCustomStyles debug>
      <MainApp />
    </SDKProvider>
  </React.StrictMode>,
);
