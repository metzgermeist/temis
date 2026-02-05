// Importar dependencias necesarias.
import { useEffect, useRef, useState } from 'react'
import './Navegador.css'
import BotonPrimario from '../atoms/BotonPrimario.jsx'
import logo from '../../img/logo.png'

// Navegador principal con enlaces a secciones del sitio.
function Navegador() {
  const [estaOculto, setEstaOculto] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const ultimoScroll = useRef(0)
  const estaOcultoRef = useRef(false)
  const ticking = useRef(false)

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

  // Lista de enlaces principales del menu.
  let enlaces = [
    { id: 'inicio', texto: 'Inicio', destino: '#inicio' },
    { id: 'quienes-somos', texto: 'Quienes somos', destino: '#quienes-somos' },
    { id: 'valores', texto: 'Valores', destino: '#valores' },
    { id: 'casos', texto: 'Casos', destino: '#casos' },
    { id: 'blog', texto: 'Blog', destino: '#blog' }
  ]

  // Renderizar cada enlace en un item de lista.
  function RenderizarEnlace(enlace) {
    return (
      <li key={enlace.id} className="navegador__item">
        <a className="navegador__enlace" href={enlace.destino} onClick={cerrarMenu}>
          {enlace.texto}
        </a>
      </li>
    )
  }

  // Renderizar el encabezado con logo y enlaces.
  return (
    <header className={`navegador${estaOculto ? ' navegador--oculto' : ''}`} id="inicio">
      <div className="navegador__barra">
        {/* Marca del estudio juridico */}
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
        >
          {menuAbierto ? 'Cerrar' : 'Menu'}
        </button>
      </div>
      <div className={`navegador__panel${menuAbierto ? ' navegador__panel--abierto' : ''}`}>
        {/* Menu principal de navegacion */}
        <nav className="navegador__menu" aria-label="Navegacion principal">
          <ul className="navegador__lista" id="menu-principal">
            {enlaces.map(RenderizarEnlace)}
          </ul>
        </nav>
        {/* Boton de contacto rapido */}
        <BotonPrimario
          texto="Agendar consulta"
          enlace="#contacto"
          etiqueta="Agendar consulta con el estudio"
        />
      </div>
    </header>
  )
}

export default Navegador
