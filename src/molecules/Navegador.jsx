// Importar dependencias necesarias.
import { useState, useEffect } from 'react'
import './Navegador.css'
import BotonPrimario from '../atoms/BotonPrimario.jsx'
import logo from '../../img/logo.png'

// Navegador principal con enlaces a secciones del sitio.
function Navegador() {
  // Estado para controlar si el menu mobile esta abierto.
  const [menuAbierto, setMenuAbierto] = useState(false)

  // Lista de enlaces principales del menu.
  let enlaces = [
    { id: 'inicio', texto: 'Inicio', destino: '#inicio' },
    { id: 'quienes-somos', texto: 'Quienes somos', destino: '#quienes-somos' },
    { id: 'valores', texto: 'Valores', destino: '#valores' },
    { id: 'casos', texto: 'Casos', destino: '#casos' },
    { id: 'blog', texto: 'Blog', destino: '#blog' }
  ]

  // Alternar estado del menu mobile.
  function alternarMenu() {
    setMenuAbierto(!menuAbierto)
  }

  // Cerrar menu al hacer click en un enlace.
  function cerrarMenu() {
    setMenuAbierto(false)
  }

  // Bloquear scroll del body cuando el menu esta abierto.
  useEffect(() => {
    if (menuAbierto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuAbierto])

  // Renderizar cada enlace en un item de lista.
  function RenderizarEnlace(enlace) {
    return (
      <li key={enlace.id} className="navegador__item">
        <a
          className="navegador__enlace"
          href={enlace.destino}
          onClick={cerrarMenu}
        >
          {enlace.texto}
        </a>
      </li>
    )
  }

  // Renderizar el encabezado con logo y enlaces.
  return (
    <header className="navegador" id="inicio">
      {/* Marca del estudio juridico */}
      <a className="navegador__marca" href="#inicio" aria-label="Ir al inicio">
        <img className="navegador__logo" src={logo} alt="Logo del Estudio Canevaro" />
        <span className="navegador__texto">Estudio Canevaro</span>
      </a>

      {/* Boton hamburguesa para mobile */}
      <button
        className={`navegador__hamburguesa ${menuAbierto ? 'navegador__hamburguesa--activo' : ''}`}
        onClick={alternarMenu}
        aria-label={menuAbierto ? 'Cerrar menu' : 'Abrir menu'}
        aria-expanded={menuAbierto}
      >
        <span className="navegador__linea"></span>
        <span className="navegador__linea"></span>
        <span className="navegador__linea"></span>
      </button>

      {/* Overlay oscuro detras del menu */}
      <div
        className={`navegador__overlay ${menuAbierto ? 'navegador__overlay--visible' : ''}`}
        onClick={cerrarMenu}
        aria-hidden="true"
      ></div>

      {/* Menu principal de navegacion */}
      <nav
        className={`navegador__menu ${menuAbierto ? 'navegador__menu--abierto' : ''}`}
        aria-label="Navegacion principal"
      >
        <ul className="navegador__lista">{enlaces.map(RenderizarEnlace)}</ul>

        {/* Boton de contacto dentro del menu mobile */}
        <div className="navegador__cta-mobile">
          <BotonPrimario
            texto="Agendar consulta"
            enlace="#contacto"
            etiqueta="Agendar consulta con el estudio"
          />
        </div>
      </nav>

      {/* Boton de contacto rapido (solo desktop) */}
      <div className="navegador__cta-desktop">
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
