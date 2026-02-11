import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginAdmin.css'
import { useAuth } from '../contexto/AuthContexto'

function LoginAdmin() {
  const navigate = useNavigate()
  const { iniciarSesion, esAdmin } = useAuth()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [usuario, setUsuario] = useState('canevaro')
  const [clave, setClave] = useState('ubi ius')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    if (esAdmin) {
      navigate('/herramientas-blog', { replace: true })
    }
  }, [esAdmin, navigate])

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setMostrarFormulario(true)
    }, 2000)

    return () => clearTimeout(temporizador)
  }, [])

  const manejarSubmit = async (evento) => {
    evento.preventDefault()
    setError('')
    setEnviando(true)

    try {
      await iniciarSesion({ usuario, clave })
      navigate('/herramientas-blog', { replace: true })
    } catch (e) {
      setError(e.message || 'No fue posible iniciar sesion.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="login-admin">
      <article className="login-admin__panel">
        <p className="login-admin__etiqueta">Acceso privado</p>
        <h1>Buen dia, Doctor Canevaro</h1>
        <p className={`login-admin__espera${mostrarFormulario ? ' login-admin__espera--oculta' : ''}`}>
          Preparando acceso...
        </p>

        <section
          className={`login-admin__acceso${mostrarFormulario ? ' login-admin__acceso--visible' : ''}`}
          aria-hidden={!mostrarFormulario}
        >
          <p className="login-admin__descripcion">Ingrese para acceder a las herramientas del blog.</p>

          <form id="login-admin-form" className="login-admin__formulario" onSubmit={manejarSubmit}>
            <label htmlFor="usuario-admin">Usuario</label>
            <input
              id="usuario-admin"
              type="text"
              autoComplete="username"
              value={usuario}
              onChange={(evento) => setUsuario(evento.target.value)}
              disabled={!mostrarFormulario}
              required
            />

            <label htmlFor="clave-admin">Clave</label>
            <input
              id="clave-admin"
              type="password"
              autoComplete="current-password"
              value={clave}
              onChange={(evento) => setClave(evento.target.value)}
              disabled={!mostrarFormulario}
              required
            />

            {error ? <p className="login-admin__error">{error}</p> : null}
          </form>

          <div className="login-admin__acciones">
            <button
              type="submit"
              form="login-admin-form"
              className="login-admin__accion-btn"
              disabled={enviando || !mostrarFormulario}
            >
              {enviando ? 'Ingresando...' : 'Iniciar sesion'}
            </button>
            <Link to="/" className="login-admin__accion-btn login-admin__accion-btn--secundario">
              Volver al sitio
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}

export default LoginAdmin
