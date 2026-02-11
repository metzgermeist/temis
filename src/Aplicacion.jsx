import './Aplicacion.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProveedorAuth, useAuth } from './contexto/AuthContexto.jsx'
import Inicio from './pages/Inicio.jsx'
import BlogDetalle from './pages/BlogDetalle.jsx'
import LoginAdmin from './pages/LoginAdmin.jsx'
import HerramientasBlog from './pages/HerramientasBlog.jsx'

function RutaPrivada({ children }) {
  const { esAdmin, cargandoSesion } = useAuth()

  if (cargandoSesion) {
    return <main style={{ padding: '2rem 6vw' }}>Cargando sesion...</main>
  }

  if (!esAdmin) {
    return <Navigate to="/acceso-canevaro" replace />
  }

  return children
}

function Aplicacion() {
  return (
    <ProveedorAuth>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/blog/:slug" element={<BlogDetalle />} />
          <Route path="/acceso-canevaro" element={<LoginAdmin />} />
          <Route
            path="/herramientas-blog"
            element={
              <RutaPrivada>
                <HerramientasBlog />
              </RutaPrivada>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ProveedorAuth>
  )
}

export default Aplicacion

