// Importar dependencias necesarias.
import './ItemValor.css'

// Item de lista para describir un valor del estudio.
function ItemValor(props) {
  // Texto principal del valor.
  let titulo = props.titulo

  // Descripcion breve del valor.
  let descripcion = props.descripcion

  // Renderizar el valor con una marca visual.
  return (
    <li className="item-valor">
      <figure className="item-valor__marca" aria-hidden="true"></figure>
      <article className="item-valor__contenido">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </article>
    </li>
  )
}

export default ItemValor





