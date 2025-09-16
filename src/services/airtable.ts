// src/services/airtable.ts
import axios from 'axios';

export interface Service {
  id: string;
  Category: string;
  Subcategory: string;
  Name: string;
  Description: string;
  Price_Earth: number;
  Price_Mars: number;
}

const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

const airtableApi = axios.create({
  baseURL: `https://api.airtable.com/v0/${baseId}`,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await airtableApi.get(`/${tableName}`);
    const records = response.data.records;
    const services: Service[] = records.map((record: any) => ({
      id: record.id,
      ...record.fields,
    }));
    return services;
  } catch (error) {
    console.error("Ошибка при загрузке данных из Airtable:", error);
    throw new Error('Airtable fetch failed');
  }
};
