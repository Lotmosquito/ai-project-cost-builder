// src/App.tsx

import { useState } from 'react';
import { PlanetSelector } from './components/PlanetSelector';

// Типы для нашего состояния
type Step = 'planet_selection' | 'quote_builder';
type Planet = 'earth' | 'mars' | null;

function App() {
  // Состояние, которое хранит текущий шаг и выбранную планету
  const [step, setStep] = useState<Step>('planet_selection');
  const [planet, setPlanet] = useState<Planet>(null);

  // Функция, которая будет переключать нас на следующий шаг
  const handlePlanetSelect = (selectedPlanet: Planet) => {
    setPlanet(selectedPlanet);
    setStep('quote_builder');
    // В будущем здесь будет открываться "Мастерская сметы"
    console.log(`Выбрана планета: ${selectedPlanet}, переходим к следующему шагу.`);
  };

  return (
    <div>
      {/* Показываем экран выбора планеты, если это текущий шаг */}
      {step === 'planet_selection' && <PlanetSelector onSelect={handlePlanetSelect} />}
      
      {/* В будущем здесь будет отображаться сама мастерская */}
      {step === 'quote_builder' && (
        <div className="p-4">
          <h1>Мастерская сметы (в разработке)</h1>
          <p>Вы выбрали проект типа: {planet}</p>
        </div>
      )}
    </div>
  );
}

export default App;
