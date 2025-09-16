// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import WebApp from '@twa-dev/sdk';

WebApp.ready();
const themeParams = WebApp.themeParams;
document.documentElement.style.setProperty('--bg-color', themeParams.bg_color || '#ffffff');
document.documentElement.style.setProperty('--text-color', themeParams.text_color || '#000000');
document.documentElement.style.setProperty('--hint-color', themeParams.hint_color || '#999999');
document.documentElement.style.setProperty('--button-color', themeParams.button_color || '#007aff');
document.documentElement.style.setProperty('--button-text-color', themeParams.button_text_color || '#ffffff');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
