// Importar dependencias necesarias.
import './Inicio.css'
import Navegador from '../molecules/Navegador.jsx'
import SeccionPortada from '../molecules/SeccionPortada.jsx'
import SeccionQuienesSomos from '../molecules/SeccionQuienesSomos.jsx'
import SeccionValores from '../molecules/SeccionValores.jsx'
import SeccionCasos from '../molecules/SeccionCasos.jsx'
import SeccionBlog from '../molecules/SeccionBlog.jsx'
import PieDePagina from '../molecules/PieDePagina.jsx'
import BotonWhatsAppFlotante from '../atoms/BotonWhatsAppFlotante.jsx'

// Pagina principal del sitio con todas las secciones.
function Inicio() {
  // Renderizar la pagina completa en orden narrativo.
  return (
    <main className="pagina-inicio">
      {/* Navegador fijo con accesos a secciones */}
      <Navegador />
      {/* Portada con propuesta de valor */}
      <SeccionPortada />
      {/* Seccion de quienes somos */}
      <SeccionQuienesSomos />
      {/* Seccion de valores institucionales */}
      <SeccionValores />
      {/* Seccion de casos y servicios */}
      <SeccionCasos />
      {/* Seccion reservada para el blog */}
      <SeccionBlog />
      {/* Pie de pagina con contactos */}
      <PieDePagina />
      {/* Boton flotante de WhatsApp */}
      <BotonWhatsAppFlotante numero="+54 9 3815 90-4189" instagramUsuario="@carloscanevaro" />
    </main>
  )
}

export default Inicio






