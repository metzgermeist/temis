// Importar dependencias necesarias.
import './TarjetaCaso.css'

// Elemento de lista que presenta un caso o servicio.
function TarjetaCaso(props) {
  // Titulo del servicio o caso.
  let titulo = props.titulo

  // Descripcion breve del servicio.
  let descripcion = props.descripcion

  // Enlace hacia la pagina de detalle del servicio.
  let enlace = props.enlace

  // Etiqueta accesible del enlace.
  let etiqueta = props.etiqueta

  // Renderizar la tarjeta dentro de un elemento de lista.
  return (
    <li className="tarjeta-caso">
      <article className="tarjeta-caso__contenedor">
        <a className="tarjeta-caso__enlace" href={enlace} aria-label={etiqueta}>
          <h3>{titulo}</h3>
          <p>{descripcion}</p>
          <p className="tarjeta-caso__accion">Ver detalles</p>
        </a>
      </article>
    </li>
  )
}

export default TarjetaCaso





