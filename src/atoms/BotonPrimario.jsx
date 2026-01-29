// Importar dependencias necesarias.
import './BotonPrimario.css'

// Boton principal reutilizable para llamadas a la accion.
function BotonPrimario(props) {
  // Texto visible del boton.
  let texto = props.texto

  // Enlace que direcciona la accion del boton.
  let enlace = props.enlace

  // Etiqueta accesible para lectores de pantalla.
  let etiqueta = props.etiqueta

  // Renderizar el enlace con estilo de boton.
  return (
    <a className="boton-primario" href={enlace} aria-label={etiqueta}>
      {texto}
    </a>
  )
}

export default BotonPrimario





