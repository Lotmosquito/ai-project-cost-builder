// app.tsx - ФИНАЛЬНАЯ ВЕРСИЯ

// ДОБАВЛЕНО: Импорты для Telegram SDK
import { useEffect } from 'react';
import { SDKProvider, useMiniApp, BackButton } from '@telegram-apps/sdk-react';

// Твои существующие импорты
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ДОБАВЛЕНО: Компонент для синхронизации темы
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
      
      // Применяем основные цвета к body для лучшей совместимости
      document.body.style.backgroundColor = webApp.themeParams.bg_color || '#ffffff';
      document.body.style.color = webApp.themeParams.text_color || '#000000';
    }
  }, [webApp]);

  return null;
}


const App = () => (
  // ДОБАВЛЕНО: Оборачиваем всё в SDKProvider для активации SDK
  <SDKProvider>
    {/* ДОБАВЛЕНО: Компоненты для темы и кнопки "Назад" */}
    <ThemeSynchronizer />
    <BackButton />

    {/* Твой существующий код остается без изменений */}
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Твой калькулятор находится на главной странице, которую рендерит компонент <Index /> */}
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </SDKProvider>
);

export default App;
