import axios from 'axios';

// Instancia de axios configurada para tu Quarkus
export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Funciones para consumir los endpoints
export const getCandidatos = () => api.get('/candidatos');
export const getResultados = () => api.get('/candidatos/resultados');