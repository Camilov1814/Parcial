import axios from 'axios';

// Base URL de la API
const BASE_URL = 'http://localhost:3000';

// Función para obtener datos de una tabla
export const fetchTableData = async (table: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${table}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${table}:`, error);
    throw error; // Propagar el error para manejarlo en los componentes
  }
};

// Función para enviar datos a una tabla (POST)
export const postTableData = async (table: string, data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/${table}`, data);
    return response.data; // Retorna los datos del nuevo registro
  } catch (error) {
    console.error(`Error posting data to ${table}:`, error);
    throw error; // Propagar el error para manejarlo en los componentes
  }
};

// Funciones específicas para cada tabla
export const fetchModels = async () => fetchTableData('models');
export const fetchMemberships = async () => fetchTableData('memberships');
export const fetchMakeup = async () => fetchTableData('makeup');
export const fetchPhotos = async () => fetchTableData('photos');
export const fetchEvents = async () => fetchTableData('events');

// Función para agregar un nuevo evento (POST)
export const addEvent = async (event: { date: string; location: string; models: string[]; image: string }) => {
  return postTableData('events', event);
};
