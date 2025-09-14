import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
// Возможно, понадобится вернуть твой файл со стилями, если он называется иначе
import './App.css'; 

// Здесь должен быть код твоего НАСТОЯЩЕГО калькулятора,
// который сгенерировал Lovable. Пока оставим пример для проверки.
function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    
    // Настройка BackButton
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => WebApp.close());

    // Слушатель изменения темы
    const handleThemeChanged = () => {
      document.documentElement.style.setProperty('--tg-bg-color', WebApp.themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-text-color', WebApp.themeParams.text_color || '#000000');
    };
    
    WebApp.onEvent('themeChanged', handleThemeChanged);
    
    // Инициализация темы при первой загрузке
    handleThemeChanged();

    // Очистка
    return () => {
      WebApp.offEvent('themeChanged', handleThemeChanged);
      WebApp.BackButton.hide();
    };
  }, []);

  return (
    <div className="app" style={{ 
      backgroundColor: 'var(--tg-bg-color)',
      color: 'var(--tg-text-color)'
    }}>
      <h1>Тестовое приложение</h1>
      <p>Если ты это видишь, значит всё работает!</p>
    </div>
  );
}

export default App;
