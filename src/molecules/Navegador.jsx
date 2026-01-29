// Importar dependencias necesarias.
import './Navegador.css'
import BotonPrimario from '../atoms/BotonPrimario.jsx'
import logo from '../../img/logo.png'

// Navegador principal con enlaces a secciones del sitio.
function Navegador() {
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
        <a className="navegador__enlace" href={enlace.destino}>
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
      {/* Menu principal de navegacion */}
      <nav className="navegador__menu" aria-label="Navegacion principal">
        <ul className="navegador__lista">{enlaces.map(RenderizarEnlace)}</ul>
      </nav>
      {/* Boton de contacto rapido */}
      <BotonPrimario
        texto="Agendar consulta"
        enlace="#contacto"
        etiqueta="Agendar consulta con el estudio"
      />
    </header>
  )
}

export default Navegador





