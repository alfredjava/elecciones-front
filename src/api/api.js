import axios from 'axios';

// Render inyectará la URL automáticamente si configuramos la variable
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
// Instancia de axios configurada para tu Quarkus
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Funciones para consumir los endpoints
export const getCandidatos = () => api.get('/candidatos');
export const getResultados = () => api.get('/candidatos/resultados');