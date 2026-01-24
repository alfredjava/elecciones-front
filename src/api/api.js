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
export const getEstudiantes = () => api.get('/estudiantes');
export const buscarEstudiante = (documento) => api.get(`/estudiantes/buscar/${documento}`);

// --- NUEVAS FUNCIONES ---
export const registrarEstudiante = (datos) => api.post('/estudiantes', datos);
export const registrarVoto = (votoRequest) => api.post('/votos', votoRequest);

export const loginAdmin = (user, pass) => {
    // Validación sencilla para la v1.0
    if (user === 'admin' && pass === '12345') {
        localStorage.setItem('isAdmin', 'true');
        return true;
    }
    return false;
};

export const importarCandidatos = (formData) => {
    return api.post('/candidatos/importar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const importarEstudiantes = (formData) => {
    return api.post('/estudiantes/importar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};