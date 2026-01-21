import React, { useEffect, useState } from 'react';
import { getResultados } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Resultados = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los datos del backend
    const cargarDatos = () => {
      getResultados()
        .then(res => {
          setDatos(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error al cargar resultados:", err);
          setLoading(false);
        });
    };

    cargarDatos();
    // Opcional: Recargar automáticamente cada 5 segundos
    const intervalo = setInterval(cargarDatos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const totalVotos = datos.reduce((acc, curr) => acc + curr.votos, 0);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin'); // Eliminar permiso de admin
    navigate('/registro');
  };

  if (loading) return <h2 style={{ textAlign: 'center' }}>Cargando conteo de votos...</h2>;

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#2563eb' }}>📊 Resultados Finales</h1>
        <button onClick={handleLogout} style={btnSecondary}>Cerrar Sesión</button>
      </div>
      
      <p>Total de votos registrados: <strong>{totalVotos}</strong></p>

      <div style={{ marginTop: '20px' }}>
        {datos.map((c, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>{c.nombre} <strong>({c.partido})</strong></span>
              <span>{c.votos} votos</span>
            </div>
            {/* Barra de porcentaje visual */}
            <div style={progressContainer}>
              <div style={{ 
                ...progressFill, 
                width: `${totalVotos > 0 ? (c.votos / totalVotos) * 100 : 0}%` 
              }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos rápidos en objetos
const progressContainer = { width: '100%', backgroundColor: '#e2e8f0', borderRadius: '10px', height: '15px' };
const progressFill = { backgroundColor: '#2563eb', height: '100%', borderRadius: '10px', transition: 'width 0.5s ease-in-out' };
const btnSecondary = { padding: '8px 15px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default Resultados;