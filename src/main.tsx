import { useEffect } from 'react';
import { SDKProvider, useMiniApp, BackButton } from '@telegram-apps/sdk-react';

// Импортируем твой настоящий компонент калькулятора из правильного файла
import ProjectCalculator from './components/ProjectCalculator';

/**
 * Компонент, который отвечает за синхронизацию темы Telegram с CSS-переменными
 */
function ThemeSynchronizer() {
  const { webApp } = useMiniApp();

  useEffect(() => {
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
}

/**
 * Основной компонент приложения
 */
function App() {
  return (
    <SDKProvider>
      <ThemeSynchronizer />
      <BackButton />
      <div 
        className="min-h-screen" 
        style={{ 
          backgroundColor: 'var(--bg-color)', 
          color: 'var(--text-color)' 
        }}
      >
        {/* Используем настоящий компонент калькулятора */}
        <ProjectCalculator />
      </div>
    </SDKProvider>
  );
}

export default App;
