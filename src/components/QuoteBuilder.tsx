// src/components/QuoteBuilder.tsx
// ИЗМЕНЕНИЕ: Импортируем из airtable.ts
import { Service } from '../services/airtable';

type QuoteBuilderProps = {
  planet: 'earth' | 'mars';
  quoteItems: Service[];
  onAddServiceClick: () => void;
};

export function QuoteBuilder({ planet, quoteItems, onAddServiceClick }: QuoteBuilderProps) {
  const planetEmoji = planet === 'earth' ? '🌍' : '🚀';
  const planetName = planet === 'earth' ? 'Проект "Земля"' : 'Проект "Марс"';

  const totalCost = quoteItems.reduce((sum, item) => {
    // ИЗМЕНЕНИЕ: Используем новые имена полей из Airtable
    return sum + (planet === 'earth' ? item.Price_Earth : item.Price_Mars);
  }, 0);

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{planetEmoji} {planetName}</h1>
        <p className="text-sm" style={{ color: 'var(--hint-color)' }}>Ваша смета</p>
      </div>
      <div className="flex-grow">
        {quoteItems.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div className="p-6 border-2 border-dashed rounded-xl" style={{ borderColor: 'var(--hint-color)', opacity: 0.5 }}>
              <p style={{ color: 'var(--hint-color)' }}>
                В вашей смете пока нет услуг.<br/>Нажмите кнопку ниже, чтобы начать.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {quoteItems.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg flex justify-between items-center" style={{ borderColor: 'var(--hint-color)'}}>
                {/* ИЗМЕНЕНИЕ: Используем новые имена полей */}
                <span>{item.Name}</span>
                <span className="font-bold">${planet === 'earth' ? item.Price_Earth : item.Price_Mars}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--hint-color)' }}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium" style={{ color: 'var(--hint-color)' }}>Итог:</span>
          <span className="text-2xl font-bold">${totalCost.toFixed(2)}</span>
        </div>
        <button
          onClick={onAddServiceClick}
          className="w-full py-4 text-lg font-semibold rounded-xl transition-colors duration-200"
          style={{ backgroundColor: 'var(--button-color)', color: 'var(--button-text-color)' }}
        >
          + Добавить услугу
        </button>
      </div>
    </div>
  );
}
