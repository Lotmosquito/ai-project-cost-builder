// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { SDKProvider, useMiniApp, BackButton } from '@telegram-apps/sdk-react';
import App from './App'; // <--- Вот самая главная строка!
import './index.css'; // Убедись, что файл со стилями тоже подключен

// Компонент для синхронизации темы оставляем как есть
const ThemeSynchronizer = () => {
  const { webApp } = useMiniApp();

  React.useEffect(() => {
    if (webApp && webApp.themeParams) {
      document.documentElement.style.setProperty('--bg-color', webApp.themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--text-color', webApp.themeParams.text_color || '#000000');
      document.documentElement.style.setProperty('--hint-color', webApp.themeParams.hint_color || '#999999');
      document.documentElement.style.setProperty('--link-color', webApp.themeParams.link_color || '#007aff');
      document.documentElement.style.setProperty('--button-color', webApp.themeParams.button_color || '#007aff');
      document.documentElement.style.setProperty('--button-text-color', webApp.themeParams.button_text_color || '#ffffff');
    }
  }, [webApp]);

  return null;
};

// Рендерим приложение
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SDKProvider>
      <ThemeSynchronizer />
      <div 
        className="min-h-screen" 
        style={{ 
          backgroundColor: 'var(--bg-color)', 
          color: 'var(--text-color)' 
        }}
      >
        <App />
      </div>
    </SDKProvider>
  </React.StrictMode>,
);
