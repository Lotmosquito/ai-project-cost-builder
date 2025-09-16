// src/components/PlanetSelector.tsx
export function PlanetSelector({ onSelect }: { onSelect: (planet: 'earth' | 'mars') => void; }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">Выберите тип вашего проекта</h1>
      <p className="mb-8 text-sm" style={{ color: 'var(--hint-color)' }}>
        Это определит базовые цены и сложность работы.
      </p>
      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => onSelect('earth')}
          className="w-full p-6 border rounded-xl text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex flex-col items-center"
          style={{ borderColor: 'var(--hint-color)' }}
        >
          <div className="w-full h-32 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--hint-color)', opacity: 0.2 }}>
            <span className="text-lg">🌍</span>
          </div>
          <div className="text-2xl mb-2">Проект "Земля"</div>
          <p className="text-sm font-normal" style={{ color: 'var(--hint-color)' }}>
            Выполнение конкретной услуги от частного мастера. Идеально для тестов, личных проектов и быстрого результата.
          </p>
        </button>
        <button
          onClick={() => onSelect('mars')}
          className="w-full p-6 border rounded-xl text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex flex-col items-center"
          style={{ borderColor: 'var(--hint-color)' }}
        >
          <div className="w-full h-32 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--hint-color)', opacity: 0.2 }}>
            <span className="text-lg">🚀</span>
          </div>
          <div className="text-2xl mb-2">Проект "Марс"</div>
          <p className="text-sm font-normal" style={{ color: 'var(--hint-color)' }}>
            Комплексный проект под ключ. Включает стратегию, команду и юридические гарантии. Идеально для бизнеса.
          </p>
        </button>
      </div>
    </div>
  );
}
