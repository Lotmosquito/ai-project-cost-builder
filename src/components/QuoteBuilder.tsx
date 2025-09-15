// src/components/QuoteBuilder.tsx

// Типизация для данных, которые мы получим из App.tsx
type QuoteBuilderProps = {
  planet: 'earth' | 'mars';
};

export function QuoteBuilder({ planet }: QuoteBuilderProps) {
  // Определяем текст и эмодзи в зависимости от выбранной планеты
  const planetEmoji = planet === 'earth' ? '🌍' : '🚀';
  const planetName = planet === 'earth' ? 'Проект "Земля"' : 'Проект "Марс"';

  const handleAddService = () => {
    // В будущем здесь будет открываться каталог услуг
    console.log('Нажата кнопка "Добавить услугу"');
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      {/* --- Шапка --- */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
          {planetEmoji} {planetName}
        </h1>
        <p className="text-sm" style={{ color: 'var(--hint-color)' }}>
          Ваша смета
        </p>
      </div>

      {/* --- Список услуг (пока пустой) --- */}
      <div className="flex-grow flex items-center justify-center text-center">
        <div className="p-6 border-2 border-dashed rounded-xl" style={{ borderColor: 'var(--hint-color)', opacity: 0.5 }}>
          <p style={{ color: 'var(--hint-color)' }}>
            В вашей смете пока нет услуг.<br/>
            Нажмите кнопку ниже, чтобы начать.
          </p>
        </div>
      </div>

      {/* --- Итог и кнопка --- */}
      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--hint-color)' }}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium" style={{ color: 'var(--hint-color)' }}>Итог:</span>
          <span className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>$0.00</span>
        </div>
        <button
          onClick={handleAddService}
          className="w-full py-4 text-lg font-semibold rounded-xl transition-colors duration-200"
          style={{ backgroundColor: 'var(--button-color)', color: 'var(--button-text-color)' }}
        >
          + Добавить услугу
        </button>
      </div>
    </div>
  );
}
