// src/App.tsx

import { useState } from 'react';
import { PlanetSelector } from './components/PlanetSelector';
import { QuoteBuilder } from './components/QuoteBuilder'; // <-- Импортируем новый компонент

type Step = 'planet_selection' | 'quote_builder';
type Planet = 'earth' | 'mars'; // <-- Убрали null, так как планета всегда будет выбрана

function App() {
  const [step, setStep] = useState<Step>('planet_selection');
  // Задаем начальное значение, чтобы TypeScript был спокоен
  const [planet, setPlanet] = useState<Planet>('earth'); 

  const handlePlanetSelect = (selectedPlanet: Planet) => {
    setPlanet(selectedPlanet);
    setStep('quote_builder');
    console.log(`Выбрана планета: ${selectedPlanet}, переходим к Мастерской сметы.`);
  };

  return (
    <div>
      {/* Показываем экран выбора, если это первый шаг */}
      {step === 'planet_selection' && <PlanetSelector onSelect={handlePlanetSelect} />}
      
      {/* Показываем Мастерскую, если это второй шаг */}
      {step === 'quote_builder' && <QuoteBuilder planet={planet} />}
    </div>
  );
}

export default App;
