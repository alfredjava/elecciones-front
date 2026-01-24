import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Registro from './pages/Registro';
import Home from './pages/Home';
import LoginAdmin from './pages/LoginAdmin';
import Resultados from './pages/Resultados';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pantallas públicas */}
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-login" element={<LoginAdmin />} />

        {/* Pantalla PROTEGIDA */}
        <Route 
          path="/resultados" 
          element={
            <ProtectedRoute>
              <Resultados />
            </ProtectedRoute>
          } 
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/registro" />} />
        <Route 
            path="/admin-config" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;