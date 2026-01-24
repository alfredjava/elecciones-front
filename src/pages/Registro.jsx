import { useState } from 'react';
import { buscarEstudiante } from '../api/api';
import { useNavigate, Link } from 'react-router-dom'; // Importamos Link


const Registro = () => {
    const [documento, setDocumento] = useState('');
    const [estudiante, setEstudiante] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleBuscar = async () => {
        try {
            setError('');
            const res = await buscarEstudiante(documento);
            setEstudiante(res.data);
        } catch (err) {
            setError(err.response?.data || "Estudiante no encontrado");
            setEstudiante(null);
        }
    };
    const handleEntrarAVotar = () => {
        // Guardamos los datos en el storage para el Home
        localStorage.setItem('estudianteId', estudiante.id);
        localStorage.setItem('estudiante_nombre', estudiante.nombre);
        navigate('/home');
    };

    return (
        <div style={containerStyle}>
            <h1>🗳️ Validación de Votante</h1>
            
            {!estudiante ? (
                <div style={cardStyle}>
                    <p>Ingresa tu Documento de Identidad:</p>
                    <input 
                        type="text" 
                        value={documento} 
                        onChange={(e) => setDocumento(e.target.value)}
                        placeholder="Ej: 12345678"
                        style={inputStyle}
                    />
                    <button onClick={handleBuscar} style={btnStyle}>Verificar Datos</button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </div>
            ) : (
                <div style={cardStyle}>
                    <h3>¡Bienvenido/a, {estudiante.nombre}!</h3>
                    <div style={facultadHighlight}>
                        Facultad: <strong>{estudiante.facultad}</strong>
                    </div>
                    <p>Verifica que tus datos sean correctos para continuar.</p>
                    <button onClick={handleEntrarAVotar} style={btnSuccess}>Confirmar e Ir a Votar</button>
                    <button onClick={() => setEstudiante(null)} style={btnLink}>No soy yo</button>
                </div>
            )}

            {/* --- ENLACE A RESULTADOS --- */}
            <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <Link to="/resultados" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                    📊 Ver resultados (Solo Administrador)
                </Link>
            </div>
            
        </div>
    );
};

const facultadHighlight = {
    backgroundColor: '#dbeafe', 
    color: '#1e40af', 
    padding: '15px', 
    borderRadius: '8px', 
    fontSize: '1.2rem', 
    margin: '15px 0',
    border: '2px solid #1e40af'
};
const containerStyle = { padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' };
const cardStyle = { maxWidth: '400px', margin: 'auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const inputStyle = { display: 'block', width: '100%', marginBottom: '10px', padding: '8px' };
const btnStyle = { width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const btnSuccess = { ...btnStyle, backgroundColor: '#059669' };
const btnLink = { background: 'none', border: 'none', color: '#666', marginTop: '10px', cursor: 'pointer', textDecoration: 'underline' };

export default Registro;