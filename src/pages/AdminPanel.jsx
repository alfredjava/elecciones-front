import React, { useState, useEffect } from 'react';
import { importarCandidatos, getCandidatos } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { importarEstudiantes, getEstudiantes } from '../api/api';

const AdminPanel = () => {
    const [archivo, setArchivo] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [candidatos, setCandidatos] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const navigate = useNavigate();

    const refrescarCandidatos = async () => {
        try {
            const res = await getCandidatos();
            setCandidatos(res.data);
        } catch (err) {
            console.error("Error al obtener candidatos:", err);
        }
    };

    useEffect(() => {
        refrescarCandidatos();
        refrescarEstudiantes();
    }, []);

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const subirExcel = async () => {
        if (!archivo) return alert("Por favor, selecciona un archivo Excel");
        const formData = new FormData();
        formData.append('file', archivo);
        setCargando(true);
        try {
            await importarCandidatos(formData);
            alert("¡Candidatos cargados exitosamente!");
            setArchivo(null);
            refrescarCandidatos();
        } catch (err) {
            alert("Error al cargar el archivo. Verifica el formato.", err);
        } finally {
            setCargando(false);
        }
    };

    const [archivoEst, setArchivoEst] = useState(null);

const subirEstudiantes = async () => {
    if (!archivoEst) return alert("Selecciona el Excel de estudiantes");
    const formData = new FormData();
    formData.append('file', archivoEst);
    setCargando(true);
    try {
        await importarEstudiantes(formData);
        alert("Padrón cargado correctamente");
        setArchivoEst(null);
        refrescarEstudiantes();
    } catch (err) {
        alert("Error al importar estudiantes", err);
    } finally {
        setCargando(false);
    }
};

    const refrescarEstudiantes = async () => {
        try {
            const res = await getEstudiantes();
            setEstudiantes(res.data);
        } catch (err) {
            console.error("Error al obtener estudiantes:", err);
        }
    };

    return (
        <div style={containerStyle}>
            <h2>⚙️ Panel de Administración</h2>

            <div style={cardStyle}>
                <h3>Carga Masiva de Candidatos</h3>
                <input type="file" accept=".xlsx" onChange={handleFileChange} style={{ marginBottom: '15px' }} />
                <br />
                <button
                    onClick={subirExcel}
                    disabled={cargando}
                    style={cargando ? btnDisabled : btnStyle}
                >
                    {cargando ? "Procesando..." : "Subir Excel de Candidatos"}
                </button>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3>📋 Candidatos en el Sistema</h3>
                {candidatos.length === 0 ? (
                    <p style={{ color: '#666' }}>No hay candidatos cargados aún.</p>
                ) : (
                    <table style={tableStyle}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f4f6' }}>
                                <th style={thStyle}>Foto</th>
                                <th style={thStyle}>ID</th>
                                <th style={thStyle}>Nombre del Candidato</th>
                                <th style={thStyle}>Partido Político</th>
                                <th style={thStyle}>Propuesta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidatos.map((c) => (
                                <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={tdStyle}><img src={c.fotoUrl || 'https://api.dicebear.com/9.x/bottts/svg?seed=Sara'} alt={c.nombre} style={avatarStyle} /></td>
                                    <td style={tdStyle}>{c.id}</td>
                                    <td style={tdStyle}>{c.nombre}</td>
                                    <td style={tdStyle}><strong>{c.partido}</strong></td>
                                    <td style={tdStyle}>{c.propuesta}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div style={cardStyle}>
                <h3>Carga Masiva de Padrón Electoral (Estudiantes)</h3>
                <input type="file" accept=".xlsx" onChange={(e) => setArchivoEst(e.target.files[0])} style={{ marginBottom: '15px' }} />
                <br />
                <button onClick={subirEstudiantes} disabled={cargando} style={btnStyle}>
                    {cargando ? "Procesando..." : "Subir Padrón de Estudiantes"}
                </button>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3>📋 Estudiantes en el Sistema</h3>
                {estudiantes.length === 0 ? (
                    <p style={{ color: '#666' }}>No hay estudiantes cargados aún.</p>
                ) : (
                    <table style={tableStyle}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f4f6' }}>
                                <th style={thStyle}>Nombre</th>
                                <th style={thStyle}>Apellidos</th>
                                <th style={thStyle}>Documento</th>
                                <th style={thStyle}>Carnet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map((c) => (
                                <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={tdStyle}>{c.nombre}</td>
                                    <td style={tdStyle}>{c.apellidos}</td>
                                    <td style={tdStyle}><strong>{c.documentoIdentidad}</strong></td>
                                    <td style={tdStyle}>{c.carnet}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <button onClick={() => navigate('/resultados')} style={linkBtn}>
                Ir a Ver Resultados en Tiempo Real →
            </button>
        </div>
    );
};

// --- Estilos ---
const avatarStyle = { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ddd' };
const containerStyle = { padding: '30px', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' };
const cardStyle = { border: '2px dashed #cbd5e1', padding: '20px', borderRadius: '8px', backgroundColor: '#f8fafc', textAlign: 'center' };
const btnStyle = { padding: '10px 25px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const btnDisabled = { ...btnStyle, backgroundColor: '#94a3b8', cursor: 'not-allowed' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '15px', textAlign: 'left' };
const thStyle = { padding: '12px', borderBottom: '2px solid #e5e7eb', color: '#374151' };
const tdStyle = { padding: '12px', color: '#4b5563' };
const linkBtn = { marginTop: '30px', background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', textDecoration: 'underline', width: '100%' };

export default AdminPanel;

