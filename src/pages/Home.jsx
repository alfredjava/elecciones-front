import React, { useEffect, useState } from 'react';
import { getCandidatos } from '../api/api';

const Home = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCandidatos()
      .then(res => {
        setCandidatos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al conectar con Quarkus:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>Cargando candidatos desde Quarkus...</h1>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header>
        <h1 style={{ color: '#2563eb' }}>🗳️ Sistema de Elecciones v1.0</h1>
        <p>Conexión con PostgreSQL: <strong>Exitosa ✅</strong></p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {candidatos.map(c => (
          <div key={c.id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <img src={c.fotoUrl} alt={c.nombre} style={{ width: '80px', borderRadius: '50%' }} />
            <h3>{c.nombre}</h3>
            <p style={{ color: '#666' }}>{c.partido}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;