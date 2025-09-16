// src/App.tsx
import { useState, useEffect } from 'react';
import { PlanetSelector } from './components/PlanetSelector';
import { QuoteBuilder } from './components/QuoteBuilder';
import { ServiceCatalog } from './components/ServiceCatalog';
import { Service, fetchServices } from './services/airtable';
import WebApp from '@twa-dev/sdk';

type Step = 'planet_selection' | 'quote_builder';
type Planet = 'earth' | 'mars';

function App() {
  const [step, setStep] = useState<Step>('planet_selection');
  const [planet, setPlanet] = useState<Planet>('earth');
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [quoteItems, setQuoteItems] = useState<Service[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 1. Ждем, пока Telegram SDK будет полностью готов
        WebApp.ready();

        // 2. Устанавливаем цвета темы
        const themeParams = WebApp.themeParams;
        document.body.style.backgroundColor = themeParams.bg_color || '#ffffff';
        document.body.style.color = themeParams.text_color || '#000000';

        // 3. Только теперь загружаем данные из Airtable
        const servicesFromAirtable = await fetchServices();
        setAllServices(servicesFromAirtable);

      } catch (err) {
        setError('Не удалось загрузить каталог услуг.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handlePlanetSelect = (selectedPlanet: Planet) => {
    setPlanet(selectedPlanet);
    setStep('quote_builder');
  };

  const handleAddServiceToQuote = (service: Service) => {
    setQuoteItems(prevItems => [...prevItems, service]);
    setIsCatalogOpen(false);
  };

  // Убираем div-обертку, так как стили применяются к body
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }
  
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <>
      {step === 'planet_selection' && <PlanetSelector onSelect={handlePlanetSelect} />}
      {step === 'quote_builder' && (
        <QuoteBuilder 
          planet={planet} 
          quoteItems={quoteItems}
          onAddServiceClick={() => setIsCatalogOpen(true)}
        />
      )}
      <ServiceCatalog 
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectService={handleAddServiceToQuote}
        services={allServices} 
      />
    </>
  );
}

export default App;
