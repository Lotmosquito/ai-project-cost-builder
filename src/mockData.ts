// src/mockData.ts

export interface Service {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  priceEarth: number;
  priceMars: number;
}

export const services: Service[] = [
  {
    id: 'logo_std',
    category: 'Изображения',
    subcategory: 'Айдентика',
    name: 'Логотип (пакет "Стандарт")',
    description: 'Основная, альтернативная и монохромная версии.',
    priceEarth: 150,
    priceMars: 2500,
  },
  {
    id: 'reels_30s',
    category: 'Видео',
    subcategory: 'Контент для соцсетей',
    name: 'Короткий ролик Reels/Shorts (до 30с)',
    description: 'Быстрый и динамичный ролик для вертикальных форматов.',
    priceEarth: 100,
    priceMars: 1500,
  },
  {
    id: 'neuro_photo',
    category: 'Изображения',
    subcategory: 'Контент для соцсетей',
    name: 'Нейрофотосессия',
    description: 'Набор из 20 стилизованных изображений в едином стиле.',
    priceEarth: 80,
    priceMars: 1200,
  },
  {
    id: 'anim_logo',
    category: 'Видео',
    subcategory: 'Айдентика',
    name: 'Анимированный логотип (до 7с)',
    description: 'Эффектное появление вашего логотипа для видео.',
    priceEarth: 80,
    priceMars: 800,
  },
];
