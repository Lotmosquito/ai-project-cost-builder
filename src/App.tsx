// src/App.tsx
import { useState, useEffect } from 'react';
import { PlanetSelector } from './components/PlanetSelector';
import { QuoteBuilder } from './components/QuoteBuilder';
import { ServiceCatalog } from './components/ServiceCatalog';
// ИЗМЕНЕНИЕ: Импортируем из нового файла airtable.ts
import { Service, fetchServices } from './services/airtable';

type Step = 'planet_selection' | 'quote_builder';
type Planet = 'earth' | 'mars';

function App() {
  const [step, setStep] = useState<Step>('planet_selection');
  const [planet, setPlanet] = useState<Planet>('earth');
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [quoteItems, setQuoteItems] = useState<Service[]>([]);
  
  // ДОБАВЛЕНО: Состояния для загрузки данных
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ДОБАВЛЕНО: Хук для загрузки данных при старте
  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesFromAirtable = await fetchServices();
        setAllServices(servicesFromAirtable);
      } catch (err) {
        setError('Не удалось загрузить каталог услуг.');
      } finally {
        setIsLoading(false);
      }
    };
    loadServices();
  }, []);

  const handlePlanetSelect = (selectedPlanet: Planet) => {
    setPlanet(selectedPlanet);
    setStep('quote_builder');
  };

  const handleAddServiceToQuote = (service: Service) => {
    setQuoteItems(prevItems => [...prevItems, service]);
    setIsCatalogOpen(false);
  };

  // ДОБАВЛЕНО: Экраны загрузки и ошибки
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка каталога...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen">
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
        services={allServices} // Передаем загруженные услуги
      />
    </div>
  );
}

export default App;
