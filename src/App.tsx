// src/App.tsx

import { useEffect } from 'react';
import {
  AppRoot,
  BackButton,
  useThemeParams,
} from '@tma.js/sdk-react';

// Компонент калькулятора, который сгенерировал Lovable
// (предполагаем, что его логика находится здесь)
function Calculator() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Калькулятор проектов</h1>
      <p>Тут будет твой калькулятор...</p>
      {/* Здесь должна быть вся структура твоего калькулятора */}
    </div>
  );
}

// Компонент для синхронизации темы
function ThemeSynchronizer() {
  const themeParams = useThemeParams();

  useEffect(() => {
    // Устанавливаем CSS переменные для основных цветов из темы Telegram
    document.documentElement.style.setProperty('--bg-color', themeParams.backgroundColor || '#ffffff');
    document.documentElement.style.setProperty('--text-color', themeParams.textColor || '#000000');
    document.documentElement.style.setProperty('--hint-color', themeParams.hintColor || '#999999');
    document.documentElement.style.setProperty('--link-color', themeParams.linkColor || '#007aff');
    document.documentElement.style.setProperty('--button-color', themeParams.buttonColor || '#007aff');
    document.documentElement.style.setProperty('--button-text-color', themeParams.buttonTextColor || '#ffffff');
  }, [themeParams]);

  return null;
}

// Основной компонент приложения
export default function App() {
  return (
    // AppRoot - это новый аналог SDKProvider
    <AppRoot
      style={{
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
      }}
    >
      <ThemeSynchronizer />
      <BackButton />
      <div className="min-h-screen">
        <Calculator />
      </div>
    </AppRoot>
  );
}
