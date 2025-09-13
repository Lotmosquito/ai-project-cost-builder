// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  // УБРАЛИ AppRoot ИЗ ИМПОРТА
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
    document.documentElement.style.setProperty('--hint-color', themeParams.hintColor || '#999999');
    document.documentElement.style.setProperty('--link-color', themeParams.linkColor || '#007aff');
    document.documentElement.style.setProperty('--button-color', themeParams.buttonColor || '#007aff');
    document.documentElement.style.setProperty('--button-text-color', themeParams.buttonTextColor || '#ffffff');
  }, [themeParams]);

  return null;
}

// Главный компонент, который мы рендерим
function MainApp() {
  return (
    // УБРАЛИ ОБЕРТКУ AppRoot, используем обычный div
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

// Рендерим все в DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
);
