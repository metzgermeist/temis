// Importar dependencias necesarias.
import './PieDePagina.css'

// Pie de pagina con informacion de contacto y enlaces utiles.
function PieDePagina() {
  // Renderizar el pie de pagina completo.
  return (
    <footer className="pie-pagina animacion-aparecer" id="contacto" aria-labelledby="titulo-contacto">
      {/* Bloque principal con datos del estudio */}
      <section className="pie-pagina__contenido">
        <header className="pie-pagina__marca">
          <h2 id="titulo-contacto">Estudio Juridico Canevaro</h2>
          <p>
            Atencion personalizada para personas y empresas que buscan respuestas legales claras y
            efectivas.
          </p>
        </header>
        {/* Informacion de contacto oficial */}
        <address className="pie-pagina__contacto">
          <p>Av. Libertador 1234, Piso 8, Buenos Aires</p>
          <a href="mailto:contacto@estudiocanevaro.com">contacto@estudiocanevaro.com</a>
          <a href="tel:+541123456789">+54 11 2345 6789</a>
        </address>
        {/* Enlaces secundarios para navegacion rapida */}
        <nav className="pie-pagina__navegacion" aria-label="Enlaces secundarios">
          <ul className="pie-pagina__lista">
            <li>
              <a href="#quienes-somos">Quienes somos</a>
            </li>
            <li>
              <a href="#valores">Valores</a>
            </li>
            <li>
              <a href="#casos">Casos</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </nav>
      </section>
      {/* Linea final con derechos reservados */}
      <section className="pie-pagina__legal">
        <small>(c) 2026 Estudio Juridico Canevaro. Todos los derechos reservados.</small>
      </section>
    </footer>
  )
}

export default PieDePagina





