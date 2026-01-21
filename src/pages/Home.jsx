import React, { useEffect, useState } from 'react';
import { getCandidatos, registrarVoto } from '../api/api'; // Importamos la nueva función
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Recuperamos el ID del estudiante que guardamos en el Registro
  const estudianteId = localStorage.getItem('estudianteId');
  const nombreEstudiante = localStorage.getItem('estudiante_nombre');
  const carnetEstudiante = localStorage.getItem('estudiante_carnet');

  useEffect(() => {
    // Si no hay un estudiante registrado, lo mandamos de vuelta al registro
    if (!estudianteId) {
      navigate('/registro');
      return;
    }

    getCandidatos()
      .then(res => {
        setCandidatos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al conectar con Quarkus:", err);
        setLoading(false);
      });
  }, [estudianteId, navigate]);

  const enviarVoto = async (candidatoId) => {
    try {
      // Enviamos el voto usando la estructura que espera tu backend
      await registrarVoto({
        estudianteId: parseInt(estudianteId),
        candidatoId: candidatoId
      });
      
      alert("¡Voto registrado con éxito!");
      
      // Limpiamos el ID para que otra persona pueda votar en la misma PC
      localStorage.removeItem('estudianteId');
      localStorage.removeItem('estudiante_nombre');
      localStorage.removeItem('estudiante_carnet');
      
      // Redirigimos a una página de resultados o éxito
      navigate('/registro'); 
    } catch (err) {
      // Si el estudiante ya votó, el backend enviará un error 409 o 400
      alert(err.response?.data || "Error al procesar el voto");
    }
  };

  if (loading) return <h1>Cargando candidatos desde Quarkus...</h1>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
     <header style={{ borderBottom: '2px solid #eee', marginBottom: '20px', paddingBottom: '10px' }}>
        <h1 style={{ color: '#2563eb', margin: 0 }}>🗳️ Sistema de Elecciones v1.0</h1>
        <div style={{ marginTop: '10px', color: '#444' }}>
          <p style={{ margin: '5px 0' }}>
            Votante: <strong>{nombreEstudiante}</strong> 
          </p>
          <p style={{ margin: '5px 0' }}>
            Carnet: <strong>{carnetEstudiante}</strong> | ID Sistema: <strong>{estudianteId}</strong>
          </p>
          <span style={{ fontSize: '0.8rem', color: 'green' }}>Sesión Iniciada ✅</span>
        </div>
      </header>

{/* Grid de candidatos con botones de votar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {candidatos.map(c => (
          <div key={c.id} style={cardStyle}>
            <img src={c.fotoUrl} alt={c.nombre} style={{ width: '100px', borderRadius: '50%' }} />
            <h3>{c.nombre}</h3>
            <p>{c.partido}</p>
<button onClick={() => enviarVoto(c.id)} style={voteBtnStyle}>Votar por {c.nombre}</button>
          </div>
        ))}
      </div>
    </div>
  );
};
const cardStyle = { border: '1px solid #ccc', padding: '20px', borderRadius: '10px', textAlign: 'center', width: '200px' };
const voteBtnStyle = { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' };

export default Home;