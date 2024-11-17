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

// Funciones específicas para cada tabla
export const fetchModels = async () => fetchTableData('models');
export const fetchMemberships = async () => fetchTableData('memberships');
export const fetchMakeup = async () => fetchTableData('makeup');
export const fetchPhotos = async () => fetchTableData('photos');
