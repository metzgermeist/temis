import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navegador.css'
import logo from '../../img/logo.png'
import { useAuth } from '../contexto/AuthContexto.jsx'

function Navegador() {
  const { esAdmin, cerrarSesion } = useAuth()
  const [estaOculto, setEstaOculto] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const ultimoScroll = useRef(0)
  const estaOcultoRef = useRef(false)
  const ticking = useRef(false)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return () => {}

    const mediaQuery = window.matchMedia('(min-width: 64rem)')

    const actualizarEstado = (oculto) => {
      if (estaOcultoRef.current === oculto) return
      estaOcultoRef.current = oculto
      setEstaOculto(oculto)
    }

    const evaluarScroll = () => {
      const actualY = window.scrollY
      const diferencia = actualY - ultimoScroll.current
      const desplazamiento = Math.abs(diferencia)

      if (!mediaQuery.matches) {
        actualizarEstado(false)
        ultimoScroll.current = actualY
        return
      }

      if (actualY < 20) {
        actualizarEstado(false)
        ultimoScroll.current = actualY
        return
      }

      if (diferencia > 8 && actualY > 120) {
        actualizarEstado(true)
      } else if (diferencia < -8 && desplazamiento > 8) {
        actualizarEstado(false)
      }

      ultimoScroll.current = actualY
    }

    const manejarScroll = () => {
      if (ticking.current) return
      ticking.current = true
      window.requestAnimationFrame(() => {
        evaluarScroll()
        ticking.current = false
      })
    }

    ultimoScroll.current = window.scrollY
    evaluarScroll()
    window.addEventListener('scroll', manejarScroll, { passive: true })

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', evaluarScroll)
    } else {
      mediaQuery.addListener(evaluarScroll)
    }

    return () => {
      window.removeEventListener('scroll', manejarScroll)
      if (mediaQuery.addEventListener) {
        mediaQuery.removeEventListener('change', evaluarScroll)
      } else {
        mediaQuery.removeListener(evaluarScroll)
      }
    }
  }, [])

  useEffect(() => {
    if (!menuAbierto) return () => {}

    const manejarClickFuera = (evento) => {
      const panel = panelRef.current
      const toggle = toggleRef.current

      if (!panel || !toggle) return
      if (panel.contains(evento.target) || toggle.contains(evento.target)) return

      setMenuAbierto(false)
    }

    document.addEventListener('pointerdown', manejarClickFuera, true)

    return () => {
      document.removeEventListener('pointerdown', manejarClickFuera, true)
    }
  }, [menuAbierto])

  useEffect(() => {
    if (typeof window === 'undefined') return () => {}

    const mediaQuery = window.matchMedia('(min-width: 64rem)')
    const manejarCambio = (evento) => {
      if (evento.matches) {
        setMenuAbierto(false)
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', manejarCambio)
    } else {
      mediaQuery.addListener(manejarCambio)
    }

    return () => {
      if (mediaQuery.addEventListener) {
        mediaQuery.removeEventListener('change', manejarCambio)
      } else {
        mediaQuery.removeListener(manejarCambio)
      }
    }
  }, [])

  const alternarMenu = () => {
    setMenuAbierto((previo) => !previo)
  }

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  const manejarCerrarSesion = async () => {
    await cerrarSesion()
    setMenuAbierto(false)
  }

  const enlaces = [
    { id: 'inicio', texto: 'Inicio', destino: '#inicio' },
    { id: 'quienes-somos', texto: 'Quienes somos', destino: '#quienes-somos' },
    { id: 'valores', texto: 'Valores', destino: '#valores' },
    { id: 'casos', texto: 'Servicios', destino: '#casos' },
    { id: 'blog', texto: 'Blog', destino: '#blog' }
  ]

  const renderizarEnlace = (enlace) => {
    return (
      <li key={enlace.id} className="navegador__item">
        <a className="navegador__enlace" href={enlace.destino} onClick={cerrarMenu}>
          {enlace.texto}
        </a>
      </li>
    )
  }

  return (
    <header className={`navegador${estaOculto ? ' navegador--oculto' : ''}`}>
      <div className="navegador__barra">
        <a className="navegador__marca" href="#inicio" aria-label="Ir al inicio">
          <img
            className="navegador__logo"
            src={logo}
            alt="Logo de Carlos Canevaro asesores legales"
          />
          <span className="navegador__texto"> Asesores Legales</span>
        </a>
        <button
          type="button"
          className="navegador__toggle"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          onClick={alternarMenu}
          ref={toggleRef}
        >
          {menuAbierto ? 'Cerrar' : 'Menu'}
        </button>
      </div>
      <div
        className={`navegador__panel${menuAbierto ? ' navegador__panel--abierto' : ''}`}
        ref={panelRef}
      >
        <nav className="navegador__menu" aria-label="Navegacion principal">
          <ul className="navegador__lista" id="menu-principal">
            {enlaces.map(renderizarEnlace)}
          </ul>
        </nav>
        {esAdmin ? (
          <div className="navegador__admin">
            <Link to="/herramientas-blog" className="navegador__admin-boton" onClick={cerrarMenu}>
              Herramientas blog
            </Link>
            <button type="button" className="navegador__admin-boton" onClick={manejarCerrarSesion}>
              Cerrar sesion
            </button>
          </div>
        ) : null}
      </div>
      <button
        type="button"
        className={`navegador__overlay${menuAbierto ? ' navegador__overlay--activo' : ''}`}
        aria-label="Cerrar menu"
        aria-hidden={!menuAbierto}
        tabIndex={menuAbierto ? 0 : -1}
        onClick={cerrarMenu}
      />
    </header>
  )
}

export default Navegador

