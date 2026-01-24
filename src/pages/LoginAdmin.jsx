import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/api';

const LoginAdmin = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginAdmin(user, pass)) {
            navigate('/admin-config');
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>🔐 Acceso Administrativo</h2>
            <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
                <input type="text" placeholder="Usuario" onChange={e => setUser(e.target.value)} style={inputStyle} />
                <input type="password" placeholder="Contraseña" onChange={e => setPass(e.target.value)} style={inputStyle} />
                <button type="submit" style={btnStyle}>Ingresar</button>
            </form>
        </div>
    );
};

const inputStyle = { display: 'block', marginBottom: '10px', padding: '10px', width: '200px' };
const btnStyle = { width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' };

export default LoginAdmin;