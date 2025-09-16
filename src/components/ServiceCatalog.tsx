// src/components/ServiceCatalog.tsx

// 1. ИЗМЕНЕНИЕ: Импортируем Service из airtable.ts, а не из mockData.ts
import { Service } from '../services/airtable';

// 2. ИЗМЕНЕНИЕ: Добавляем `services` в props
type ServiceCatalogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: Service) => void;
  services: Service[]; // <-- Вот это
};

// 3. ИЗМЕНЕНИЕ: Получаем `services` из props
export function ServiceCatalog({ isOpen, onClose, onSelectService, services }: ServiceCatalogProps) {
  if (!isOpen) return null;

  const groupedServices = services.reduce((acc, service) => {
    // ВАЖНО: Убедись, что в Airtable колонка называется 'Category' с большой буквы
    (acc[service.Category] = acc[service.Category] || []).push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    // Этот код мы уже чинили, он должен быть правильным
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
        <div className="fixed top-0 right-0 h-full w-full max-w-md shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
            style={{ backgroundColor: 'var(--bg-color)', transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
            <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Каталог услуг</h2>
                    <button onClick={onClose} className="text-2xl">&times;</button>
                </div>
                <div className="overflow-y-auto flex-grow">
                    {Object.entries(groupedServices).map(([category, servicesInCategory]) => (
                        <div key={category} className="mb-4">
                            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--hint-color)' }}>{category}</h3>
                            <div className="space-y-2">
                                {servicesInCategory.map(service => (
                                    <div key={service.id} onClick={() => onSelectService(service)}
                                        className="p-3 border rounded-lg cursor-pointer hover:shadow-md" style={{ borderColor: 'var(--hint-color)' }}>
                                        {/* ВАЖНО: Убедись, что в Airtable колонки называются 'Name' и 'Description' */}
                                        <p className="font-semibold" style={{ color: 'var(--text-color)' }}>{service.Name}</p>
                                        <p className="text-sm" style={{ color: 'var(--hint-color)' }}>{service.Description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
