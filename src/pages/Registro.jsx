import { useState } from 'react';
import { registrarEstudiante } from '../api/api'; // Importamos la función de api.js
import { useNavigate, Link } from 'react-router-dom'; // Importamos Link


const Registro = () => {
    const [form, setForm] = useState({ nombre: '', carnet: '', documentoIdentidad: '' });
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registrarEstudiante(form);
            // Guardamos el ID que nos dio el backend para la siguiente pantalla
            localStorage.setItem('estudianteId', res.data.id);
            localStorage.setItem('estudiante_nombre', res.data.nombre);
            localStorage.setItem('estudiante_carnet', res.data.carnet);
            navigate('/home'); // O la ruta donde tengas tus candidatos
        } catch (err) {
            // Si el backend responde 409 Conflict por carnet duplicado
            setMensaje(err.response?.data || "Error en el registro");
        }
    };

    return (
<div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            <h2>Registro de Estudiante</h2>
            <form onSubmit={handleSubmit}>
                <input name="nombre" placeholder="Nombre completo" onChange={e => setForm({...form, nombre: e.target.value})} required style={inputStyle} />
                <input name="carnet" placeholder="Carnet Universitario" onChange={e => setForm({...form, carnet: e.target.value})} required style={inputStyle} />
                <input name="documentoIdentidad" placeholder="Documento Identidad" onChange={e => setForm({...form, documentoIdentidad: e.target.value})} required style={inputStyle} />
                <button type="submit" style={buttonStyle}>Entrar a Votar</button>
            </form>
            {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}

            {/* --- ENLACE A RESULTADOS --- */}
            <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <Link to="/resultados" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                    📊 Ver resultados (Solo Administrador)
                </Link>
            </div>
        </div>
    );
};

const inputStyle = { display: 'block', width: '100%', marginBottom: '10px', padding: '8px' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' };

export default Registro;